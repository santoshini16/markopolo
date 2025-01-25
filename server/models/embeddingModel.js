const mongoose = require("mongoose");

const embeddingSchema = new mongoose.Schema({
  text: { type: String, required: true },
  embedding: { type: [Number], required: true },
  metadata: {
    fileName: String,
    chunkId: Number,
  },
});

const Embedding = mongoose.model("Embedding", embeddingSchema);

module.exports = Embedding;
