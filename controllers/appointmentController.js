// /src/controllers/appointmentController.js
const { extractEntities } = require('../services/entityService');
const { normalizeEntities } = require('../services/normalizeService');
const { extractTextFromImage } = require('../services/ocrService');

async function parseAppointment(req, res) {
  try {
    let rawText = req.body.text;

    // If image provided, run OCR
    if (!rawText && req.file) {
      const result = await extractTextFromImage(req.file.path);
      rawText = result.raw_text;
    }

    if (!rawText) {
      return res.status(400).json({ 
        status: "needs_clarification",
        message: "No input text or image provided" 
      });
    }

    // Step 1: Entities
    const entitiesResult = extractEntities(rawText);

    // Guardrail: No entities extracted
    if (!entitiesResult || !entitiesResult.entities) {
      return res.json({
        status: "needs_clarification",
        message: "Could not extract entities from input"
      });
    }

    // Step 2: Normalization
    const normResult = normalizeEntities(entitiesResult.entities);

    // Guardrail: Normalization flagged uncertainty
    if (normResult.status === "needs_clarification") {
      return res.json(normResult);
    }

    // Guardrail: Missing essential fields
    if (!normResult.normalized.date || !normResult.normalized.time) {
      return res.json({
        status: "needs_clarification",
        message: "Ambiguous or missing date/time in appointment"
      });
    }

    // Step 3: Final Appointment JSON
    const final = {
      appointment: {
        department: entitiesResult.entities.department || "General",
        date: normResult.normalized.date,
        time: normResult.normalized.time,
        tz: normResult.normalized.tz || "UTC"
      },
      status: "ok"
    };

    return res.json(final);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      status: "error",
      message: "Failed to parse appointment" 
    });
  }
}

module.exports = { parseAppointment };
