const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  const fs = require("fs");
  const pdfBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(pdfBuffer);
  return pdfData.text;
};

module.exports = { extractTextFromPDF };

