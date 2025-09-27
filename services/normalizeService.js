const chrono = require('chrono-node');

function normalizeEntities(entities) {
  let normalized = {};

  try {
    // Extract clean strings
    let datePhrase = entities.date_phrase || "";
    let timePhrase = entities.time_phrase || "";
    let department = entities.department || "";

    // Guardrail: if date contains time, split it
    if (datePhrase && /\b(am|pm|[0-2]?[0-9]:[0-5][0-9])\b/i.test(datePhrase)) {
      // Let chrono handle both
      const parsed = chrono.parseDate(datePhrase);
      if (parsed) {
        normalized.date = parsed.toISOString().split("T")[0];
        normalized.time = parsed.toTimeString().split(" ")[0];
      } else {
        return {
          status: "needs_clarification",
          message: "Unable to normalize combined date/time phrase"
        };
      }
    } else {
      // Normal parse of separate date + time
      if (datePhrase) {
        const parsedDate = chrono.parseDate(datePhrase);
        if (parsedDate) {
          normalized.date = parsedDate.toISOString().split("T")[0];
        }
      }
      if (timePhrase) {
        const parsedTime = chrono.parseDate(timePhrase);
        if (parsedTime) {
          normalized.time = parsedTime.toTimeString().split(" ")[0];
        }
      }
    }

    // Add department to normalized output
    normalized.department = department;

    // Guardrail: Missing fields
    if (!normalized.date || !normalized.time || !normalized.department) {
      return {
        status: "needs_clarification",
        message: "Ambiguous date/time/department, need user clarification"
      };
    }

    return { status: "ok", normalized };

  } catch (err) {
    console.error("Normalization error:", err);
    return {
      status: "needs_clarification",
      message: "Error during normalization"
    };
  }
}

module.exports = { normalizeEntities };
