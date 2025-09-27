// /src/routes/api.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { extractTextFromImage } = require('../services/ocrService');
const { extractEntities } = require('../services/entityService');
const { normalizeEntities } = require('../services/normalizeService');
const { parseAppointment } = require('../controllers/appointmentController');

// OCR route
router.post('/ocr', upload.single('image'), async (req, res) => {
  try {
    if (req.body.text) {
      return res.json({ raw_text: req.body.text, confidence: 1.0 });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No text or image provided' });
    }
    const result = await extractTextFromImage(req.file.path);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Entities route
router.post('/entities', (req, res) => {
  try {
    const { raw_text } = req.body;
    if (!raw_text) return res.status(400).json({ error: "raw_text required" });
    const result = extractEntities(raw_text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Normalize route
router.post('/normalize', (req, res) => {
  try {
    const { entities } = req.body;
    if (!entities) return res.status(400).json({ error: "entities required" });
    const result = normalizeEntities(entities);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Full pipeline
router.post('/parse', upload.single('image'), parseAppointment);

module.exports = router;
