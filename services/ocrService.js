// /src/services/ocrService.js
const Tesseract = require('tesseract.js');
const Jimp = require('jimp').Jimp;

async function extractTextFromImage(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    
    image
      .greyscale()
      .contrast(0.5)
      .threshold({ max: 255 });

    const processedImageBuffer = await image.getBuffer('image/png');

    console.log('Running OCR with PSM 7 (Single Line Mode)...');

    const options = {
      tessedit_pageseg_mode: 7, // Single line mode
    };

    const { data: { text, confidence } } = await Tesseract.recognize(
      processedImageBuffer,
      'eng',
      options
    );

    const cleanText = text.trim();
    const conf = confidence / 100; // normalize 0–1

    // Guardrail: If OCR confidence too low or no text extracted
    if (!cleanText || conf < 0.5) {
      return {
        status: "needs_clarification",
        message: "OCR failed or text too unclear"
      };
    }

    return {
      raw_text: cleanText,
      confidence: Number(conf.toFixed(2))
    };

  } catch (error) {
    console.error('OCR Error:', error);
    return {
      status: "needs_clarification",
      message: "OCR failed to extract text"
    };
  }
}

module.exports = { extractTextFromImage };
