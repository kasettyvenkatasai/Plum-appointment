const departmentMapping = {
  Dermatology: ["dermatologist", "skin", "acne", "eczema", "rash", "derma"],
  Orthopedics: ["orthopedic", "bone", "joint", "fracture", "orthopaedic", "back pain"],
  Pediatrics: ["pediatrician", "child", "kids doctor", "infant", "baby", "children"],
  Ophthalmology: ["ophthalmologist", "eye", "vision", "cataract", "optometrist", "sight"],
  ENT: ["ent", "ear", "nose", "throat", "otolaryngologist", "sinus"],
  Psychiatry: ["psychiatrist", "mental health", "depression", "anxiety", "psych"],
  Gynecology: ["gynecologist", "obgyn", "pregnancy", "women health", "female doctor"],
  Urology: ["urologist", "urine", "bladder", "kidney stone", "prostate"],
  Gastroenterology: ["gastroenterologist", "stomach", "liver", "intestine", "digestive", "colon"],
  Pulmonology: ["pulmonologist", "lungs", "respiratory", "asthma", "bronchitis"],
  Endocrinology: ["endocrinologist", "hormone", "thyroid", "diabetes", "pituitary"],
  Nephrology: ["nephrologist", "kidney", "renal", "dialysis"],
  Cardiology: ["cardiologist", "heart", "cardiology", "chest pain"],
  Neurology: ["neurologist", "neuro", "brain", "nerves", "stroke", "seizure"],
  Dentistry: ["dentist", "dentistry", "tooth", "dental", "teeth"],
  General: ["doctor", "gp", "physician", "clinic", "general practitioner", "checkup"]
};

function normalizeDepartment(rawText) {
  const lower = rawText.toLowerCase();
  let matchedDept = null;

  for (const [dept, keywords] of Object.entries(departmentMapping)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        // If already matched, prefer the more specific one (not General)
        if (!matchedDept || matchedDept === "General") {
          matchedDept = dept;
        }
      }
    }
  }

  return matchedDept;
}

module.exports = { normalizeDepartment };
