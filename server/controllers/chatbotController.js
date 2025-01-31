const fs = require("fs");
const { extractTextFromPDF } = require("../utils/fileHandler");
const { generateEmbedding, saveEmbeddingsToDB, findSimilarEmbeddings } = require("../utils/embeddingUtils");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const Embedding = require("../models/embeddingModel");

const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    const text = await extractTextFromPDF(filePath);
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
    const textChunks = await splitter.splitText(text);

    const embeddings = await generateEmbedding(textChunks);
    await saveEmbeddingsToDB(embeddings, textChunks, fileName);
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File processed and embeddings saved successfully." });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File processing failed." });
  }
};

const queryChatbot = async (req, res) => {
  try {
    const { query } = req.body;
    const queryEmbedding = await generateEmbedding([query]);

    const results = await findSimilarEmbeddings(queryEmbedding[0]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error querying chatbot:", error);
    res.status(500).json({ error: "Query processing failed." });
  }
};

module.exports = { uploadFile, queryChatbot };

