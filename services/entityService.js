// /src/services/entityService.js
const chrono = require('chrono-node');
const { normalizeDepartment } = require('../utils/departmentMapping');

function extractEntities(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Invalid input text');
  }

  let datePhrase = null;
  let timePhrase = null;
  let department = normalizeDepartment(rawText);

  // Use chrono to parse natural date/time phrases
  const results = chrono.parse(rawText, new Date(), { forwardDate: true });
  if (results.length > 0) {
    const r = results[0];
    if (r.start.knownValues.weekday !== undefined || r.text) {
      datePhrase = r.text; // "next Friday"
    }
    if (r.start.knownValues.hour !== undefined) {
      const hour = r.start.get('hour');
      const minute = r.start.get('minute') || 0;
      timePhrase = `${hour}:${minute.toString().padStart(2, '0')}`;
    }
  }

  // Guardrail: if missing key entities → return needs_clarification
  if (!datePhrase || !timePhrase || !department) {
    return {
      status: "needs_clarification",
      message: "Ambiguous date/time or department"
    };
  }

  // Confidence heuristic
  let confidence = 0.0;
  if (datePhrase) confidence += 0.3;
  if (timePhrase) confidence += 0.3;
  if (department) confidence += 0.4;

  return {
    entities: {
      date_phrase: datePhrase,
      time_phrase: timePhrase,
      department
    },
    entities_confidence: Number(confidence.toFixed(2))
  };
}

module.exports = { extractEntities };
