# TruthLens - AI Media Verification Platform

## Problem Statement
In an era of rapid AI advancements, deepfakes and manipulated media during war situations spreading unwanted hate are becoming increasingly sophisticated, eroding trust in digital content and facilitating the spread of misinformation across images and videos.

## Project Description
TruthLens is a high-performance, fullstack AI media verification platform designed to detect deepfakes, generative AI tampering, and digital manipulation of war and other media content using enterprise-grade scanning. TruthLens combines a stunning, cinematic user interface with a robust Node.js backend to provide users with persistent scan history, side-by-side media comparison, and automated executive reports.

---

## Google AI Usage
### Tools / Models Used
- **Gemini 1.5 Flash:** Multimodal analysis for deep-level scanning of image and video artifacts.
- **Google Generative AI SDK:** Used for structured data analysis and generating executive scan summaries.

### How Google AI Was Used
Google AI is integrated into the core analysis pipeline of TruthLens. When media is uploaded, Gemini 1.5 Flash is invoked to analyze pixels, lighting consistency, and subsurface scattering. The model then generates a technical confidence score and a natural language explanation, which the application uses to build searchable history records and formatted executive reports.

---

## Proof of Google AI Usage
Attach screenshots in a `/proof` folder:

![AI Proof](proof\Screenshot (37).png)
![AI Proof](proof\Screenshot (38).png)



---

## Screenshots 
Add project screenshots:

![Screenshot1](screenshots\Screenshot (29).png)  
![Screenshot2](screenshots\Screenshot (30).png)
![Screenshot3](screenshots\Screenshot (31).png)
[Screenshot4](screenshots\Screenshot (32).png)
[Screenshot5](screenshots\Screenshot (33).png)
[Screenshot6](screenshots\Screenshot (34).png)
[Screenshot7](screenshots\Screenshot (36).png)



---

## Demo Video
Upload your demo video to Google Drive and paste the shareable link here(max 3 minutes).
[Watch Demo](https://drive.google.com/file/d/1KifUQcUC0tZYxlMfhmg_WqNYqfYh8VNb/view?usp=sharing)

---

## Installation Steps

```bash
# Clone the repository
git clone https://github.com/akhilkrishnapv/build-with-ai

# Go to project folder
cd truthlens

# Install dependencies
npm install
```

### 🚀 Setup Guide
1. **Database:** Ensure **MongoDB Community Server** is installed and running.
2. **Environment:** Copy `server/.env.example` to `server/.env` and fill in your details:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/truthlens
   JWT_SECRET=your_secret_key
   ```
3. **Run Application:**
   * **Terminal 1 (Backend):** `npm run dev:server`
   * **Terminal 2 (Frontend):** `npm run dev`
4. **Access:** Open `http://localhost:5173` in your browser.
