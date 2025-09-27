# 🗓️ Appointment Parser Backend  

A backend service designed to **extract appointment details** (date, time, and department) from **text or images**. It combines **OCR (Tesseract)** with **NLP (chrono-node)** and custom normalization rules to parse and structure natural language queries.  

---

## ✨ Features  
- **OCR-Powered Text Extraction** 🖼️ → Upload images and extract text using Tesseract.  
- **Entity Recognition** 📅 ⏰ 🏥 → Identify dates, times, and departments from free-form text.  
- **Normalization + Guardrails** ✅ → Clean and standardize extracted entities.  
- **End-to-End Parsing** 🔄 → Directly parse full appointment sentences like:  
  > "I want to meet a heart specialist at 3pm today"  

---

## 🚀 Project Flow  
1. **Input**: Users provide either plain text or an image.  
2. **OCR**: Images are processed via Tesseract to extract text.  
3. **Entity Extraction**: Text is parsed with chrono-node and regex patterns.  
4. **Normalization**: Guardrails applied to clean & standardize.  
5. **Output**: JSON with structured appointment data.  

---

## 🛠️ Tech Stack  
- **Backend**: Node.js + Express  
- **OCR**: Tesseract.js  
- **NLP**: chrono-node  
- **API**: REST (served via ngrok in dev)  

---

## ⚙️ Getting Started  

### Prerequisites  
- Install **Node.js** (includes `npm`)  

### Installation & Running  
Clone the repository:  
```bash
git clone https://github.com/kasettyvenkatasai/Plum-appointment.git
cd backend1
```
### Installation & Running  


Install dependencies:
```bash
npm install
``` 

Run the server:
```bash
node server.js
```
Base Url:
```bash
https://presley-cryptal-deja.ngrok-free.dev
```
OCR api:
```bash
curl -X POST https://presley-cryptal-deja.ngrok-free.dev/api/ocr \
  -F "file=@sample.png"
```

Entities API:
```bash
curl -X POST https://presley-cryptal-deja.ngrok-free.dev/api/entities \
  -H "Content-Type: application/json" \
  -d '{ "text": "I want to meet a heart specialist at 3pm today" }'
  ```
Normalize API
```bash
curl -X POST https://presley-cryptal-deja.ngrok-free.dev/api/normalize \
  -H "Content-Type: application/json" \
  -d '{
        "date_phrase": "today",
        "time_phrase": "3pm",
        "department": "heart specialist"
      }'
```
Parse API
```bash
curl -X POST https://presley-cryptal-deja.ngrok-free.dev/api/parse \
  -H "Content-Type: application/json" \
  -d '{ "text": "I want to meet a heart specialist at 3pm today" }'
```


