const departmentMapping = {
  Dentistry: ["dentist", "dentistry", "tooth", "dental", "teeth"],
  Cardiology: ["cardiologist", "heart", "cardiology", "chest pain"],
  Neurology: ["neurologist", "neuro", "brain", "nerves", "stroke", "seizure"],
  General: ["doctor", "gp", "physician", "clinic", "general practitioner", "checkup"],

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
  Nephrology: ["nephrologist", "kidney", "renal", "dialysis"]
};

function normalizeDepartment(rawText) {
  const lower = rawText.toLowerCase();
  for (const [dept, keywords] of Object.entries(departmentMapping)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return dept;
      }
    }
  }
  return null;
}

module.exports = { normalizeDepartment };
