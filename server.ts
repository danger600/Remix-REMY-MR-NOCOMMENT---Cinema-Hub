import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateText, type ModelMessage } from "ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const chatModel = "google/gemini-3.8-flash";
const maxChatMessageLength = 4000;
const maxChatHistoryMessages = 20;
const suggestionGenres = new Set(["action", "horror", "drama", "scifi"]);
const chatInstructions =
  "You are the AI assistant for REMY MR NOCOMMENT (Tiger Nsanzi). You are professional but have the 'Danger in the Building' energy. Use Rwandan references. Keep it cool. If the user asks for JSON data (like movie recommendations), ONLY return the JSON data without any explanation.";

function normalizeChatMessage(value: unknown): ModelMessage | null {
  if (!value || typeof value !== "object") return null;

  const entry = value as {
    role?: unknown;
    parts?: unknown;
    text?: unknown;
    content?: unknown;
  };
  const role =
    entry.role === "user"
      ? "user"
      : entry.role === "model" || entry.role === "assistant"
        ? "assistant"
        : null;

  if (!role) return null;

  const partText = Array.isArray(entry.parts)
    ? entry.parts
        .map((part) => {
          if (!part || typeof part !== "object") return "";
          const text = (part as { text?: unknown }).text;
          return typeof text === "string" ? text : "";
        })
        .filter(Boolean)
        .join("\n")
    : "";
  const fallbackText =
    typeof entry.text === "string"
      ? entry.text
      : typeof entry.content === "string"
        ? entry.content
        : "";
  const content = (partText || fallbackText)
    .trim()
    .slice(0, maxChatMessageLength);

  if (!content) return null;
  return role === "user"
    ? { role: "user", content }
    : { role: "assistant", content };
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT || 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid port number.");
  }

  // Allow cross-origin requests only from the configured frontend.
  app.use(
    cors({
      origin: process.env.FRONTEND_URL?.trim() || false,
      methods: ["GET", "POST"],
    }),
  );
  app.use(express.json({ limit: "100kb" }));

  // AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const body = req.body as { message?: unknown; history?: unknown } | null;
      const message = typeof body?.message === "string" ? body.message.trim() : "";

      if (!message || message.length > maxChatMessageLength) {
        res.status(400).json({
          error: `Message must be between 1 and ${maxChatMessageLength} characters.`,
        });
        return;
      }

      const history = Array.isArray(body?.history)
        ? body.history.slice(-maxChatHistoryMessages)
        : [];
      const messages = history
        .map(normalizeChatMessage)
        .filter((entry): entry is ModelMessage => entry !== null);
      const lastMessage = messages[messages.length - 1];

      if (
        lastMessage?.role !== "user" ||
        typeof lastMessage.content !== "string" ||
        lastMessage.content.trim() !== message
      ) {
        if (messages.length >= maxChatHistoryMessages) messages.shift();
        messages.push({ role: "user", content: message });
      }

      const result = await generateText({
        model: chatModel,
        instructions: chatInstructions,
        messages,
      });
      const responseText = result.text.trim();

      if (!responseText) {
        res.status(502).json({ error: "The AI response was empty." });
        return;
      }

      res.json({ text: responseText });
    } catch (error) {
      console.error(
        "AI chat request failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
      res.status(502).json({ error: "Failed to get AI response" });
    }
  });

  // Suggestions Endpoint
  app.post("/api/suggestions", (req, res) => {
    const body = req.body as {
      title?: unknown;
      genre?: unknown;
      description?: unknown;
    } | null;
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const genre = typeof body?.genre === "string" ? body.genre : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";

    if (
      !title ||
      title.length > 200 ||
      !suggestionGenres.has(genre) ||
      !description ||
      description.length > 2000
    ) {
      res.status(400).json({ error: "Please provide a valid movie suggestion." });
      return;
    }

    console.info("New suggestion received for genre:", genre);
    res.json({ success: true, message: "Suggestion received by the Tiger!" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
  server.on("error", (error) => {
    console.error(`Failed to listen on port ${port}:`, error);
    process.exitCode = 1;
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to initialize server:", error);
  process.exitCode = 1;
});
