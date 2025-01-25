const express = require("express");
const multer = require("multer");
const { uploadFile, queryChatbot } = require("../controllers/chatbotController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.post("/query", queryChatbot);

module.exports = router;
