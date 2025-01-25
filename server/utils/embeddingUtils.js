const axios = require('axios'); // Use Axios for HTTP requests
const { cosineSimilarity } = require("cosine-similarity");
const Embedding = require("../models/embeddingModel");

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL = "sentence-transformers/all-MiniLM-L6-v2"; // Example model

const generateEmbedding = async (text) => {
  try {
    // Using axios to make a POST request
    const response = await axios.post(
      `https://api-inference.huggingface.co/pipeline/feature-extraction/${HUGGINGFACE_MODEL}`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const embedding = response.data; // Axios automatically parses JSON response
    return Array.isArray(embedding) ? embedding[0] : embedding; // Ensure it's the embedding vector
  } catch (error) {
    console.error("Error generating embedding:", error.message);
    throw error;
  }
};

const saveEmbeddingsToDB = async (embeddings, textChunks, fileName) => {
  const documents = textChunks.map((chunk, idx) => ({
    text: chunk,
    embedding: embeddings[idx],
    metadata: { fileName, chunkId: idx },
  }));

  await Embedding.insertMany(documents);
};

const findSimilarEmbeddings = async (queryEmbedding, topK = 5) => {
  const embeddings = await Embedding.find();
  const results = embeddings.map((doc) => ({
    text: doc.text,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
};

module.exports = { generateEmbedding, saveEmbeddingsToDB, findSimilarEmbeddings };

