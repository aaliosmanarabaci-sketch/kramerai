import type { Express } from "express";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { generateIdeasRequestSchema } from "@shared/schema";
import { generateIdeas } from "./gemini";

// Rate limiter for idea generation (expensive API calls)
const ideaGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10, // Her IP için 15 dakikada maksimum 10 istek
  message: {
    error: "Çok fazla istek gönderildi. Lütfen 15 dakika sonra tekrar deneyin.",
    retryAfter: "15 dakika"
  },
  standardHeaders: true, // Rate limit bilgisini RateLimit-* headers'a ekle
  legacyHeaders: false, // X-RateLimit-* headers'ı devre dışı bırak
  handler: (req, res) => {
    res.status(429).json({
      error: "Çok fazla fikir üretme isteği gönderildi.",
      message: "Lütfen birkaç dakika bekleyip tekrar deneyin.",
      retryAfter: "15 dakika"
    });
  }
});

// Genel API rate limiter (daha esnek)
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika
  max: 30, // Her IP için dakikada 30 istek
  message: {
    error: "Çok fazla istek gönderildi. Lütfen biraz bekleyin."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export function registerRoutes(app: Express): void {
  // Genel rate limiter'ı tüm API rotalarına uygula
  app.use("/api", generalLimiter);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Idea generation endpoint - özel rate limiter ile korumalı
  app.post("/api/generate-ideas", ideaGenerationLimiter, async (req, res) => {
    try {
      const requestData = generateIdeasRequestSchema.parse(req.body);
      const ideas = await generateIdeas(requestData);
      res.json({ ideas });
    } catch (error) {
      console.error("Error generating ideas:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        console.error("Validation error details:", error);
        return res.status(400).json({ 
          error: "Geçersiz istek parametreleri",
          details: error
        });
      }
      
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Fikirler üretilirken bir hata oluştu" 
      });
    }
  });
}
