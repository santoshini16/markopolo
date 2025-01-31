const express = require("express");
const multer = require("multer");
const { uploadFile, queryChatbot } = require("../controllers/chatbotController");

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });


router.post("/upload", upload.single("file"), uploadFile);
router.post("/query", queryChatbot);

module.exports = router;
