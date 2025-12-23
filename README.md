# AI Document Analysis App

A MERN stack application for uploading, analyzing, and managing documents using AI.

## Features
- Upload PDF, Image, or Text files
- OCR for images and scanned PDFs
- AI Analysis (Summary, Key Points, Action Items)
- Rewrite/Reply functionality
- User Authentication

## Setup

### Prerequisites
- Node.js
- MongoDB (Local or Atlas)
- OpenAI API Key

### Backend Setup
1. Navigate to `/server`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-doc-analysis
   OPENAI_API_KEY=your_key
   JWT_SECRET=your_secret
   ```
4. Start server: `npm run dev` (or `node index.js`)

### Frontend Setup
1. Navigate to `/client`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## Tech Stack
- MongoDB, Express, React, Node.js
- TailwindCSS
- OpenAI API
- Tesseract.js / pdf-parse
