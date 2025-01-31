const axios = require("axios"); // Use Axios for HTTP requests
const computeCosineSimilarity = require("compute-cosine-similarity"); // Correct package
const Embedding = require("../models/embeddingModel");

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL = "sentence-transformers/all-MiniLM-L6-v2"; // Example model

// Generate Embedding from Hugging Face API
const generateEmbedding = async (text, retries = 3, delay = 5000) => {
  try {
    for (let i = 0; i < retries; i++) {
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

      let embedding = response.data;

      // Ensure the response is a valid embedding
      if (Array.isArray(embedding) && Array.isArray(embedding[0])) {
        console.log("✅ Generated Embedding:", embedding[0]);
        return embedding[0]; // Return the first valid vector
      }

      console.warn(`⚠️ Hugging Face API returned an invalid format. Retrying ${retries - i - 1} more times...`);
      await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
    }

    throw new Error("❌ Failed to get a valid embedding after multiple retries.");
  } catch (error) {
    console.error("❌ Error generating embedding:", error.message);
    throw error;
  }
};


// Save Embeddings to MongoDB
const saveEmbeddingsToDB = async (embeddings, textChunks, fileName) => {
  const documents = textChunks.map((chunk, idx) => ({
    text: chunk,
    embedding: Array.isArray(embeddings[idx]) ? embeddings[idx] : [embeddings[idx]], // Ensure array
    metadata: { fileName, chunkId: idx },
  }));

  try {
    await Embedding.insertMany(documents);
    console.log("✅ Embeddings saved to database successfully!");
  } catch (error) {
    console.error("❌ Error saving embeddings to DB:", error.message);
  }
};


// Find Similar Embeddings
const findSimilarEmbeddings = async (queryEmbedding, topK = 5) => {
  try {
    const embeddings = await Embedding.find();

    // 🔍 Debugging logs
    console.log("🔍 Query Embedding (Before Fix):", queryEmbedding);

    // 🛠 Ensure `queryEmbedding` is an array
    if (!Array.isArray(queryEmbedding)) {
      console.warn("⚠️ Warning: queryEmbedding is not an array, fixing it...");
      queryEmbedding = [queryEmbedding]; 
    }

    console.log("📌 Retrieved Database Embeddings:", embeddings.length);

    const results = embeddings.map((doc) => {
      const docEmbedding = Array.isArray(doc.embedding) ? doc.embedding : [doc.embedding]; // Ensure it's an array
      return {
        text: doc.text,
        similarity: computeCosineSimilarity(queryEmbedding, docEmbedding),
      };
    });

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  } catch (error) {
    console.error("❌ Error finding similar embeddings:", error.message);
    return [];
  }
};



module.exports = { generateEmbedding, saveEmbeddingsToDB, findSimilarEmbeddings };



