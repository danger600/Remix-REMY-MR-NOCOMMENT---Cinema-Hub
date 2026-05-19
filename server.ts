import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Allow requests from Vercel (or any other domain in production)
  app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // Set FRONTEND_URL on Render
    methods: ["GET", "POST"],
    credentials: true
  }));

  app.use(express.json());

  // AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are the AI assistant for REMY MR NOCOMMENT (Tiger Nsanzi). You are professional but have the 'Danger in the Building' energy. Use Rwandan references. Keep it cool. If the user asks for JSON data (like movie recommendations), ONLY return the JSON data without any explanation.",
        },
      });

      const result = await chat.sendMessage({ message });
      const responseText = result.text;
      
      res.json({ text: responseText });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  // Suggestions Endpoint
  app.post("/api/suggestions", async (req, res) => {
    try {
      const { title, genre, description } = req.body;
      console.log(`New Suggestion: ${title} (${genre}) - ${description}`);
      // In a real app, you'd save this to a database like Firestore or MongoDB
      res.json({ success: true, message: "Suggestion received in the building!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit suggestion" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
