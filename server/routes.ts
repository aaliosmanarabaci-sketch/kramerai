import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateIdeasRequestSchema } from "@shared/schema";
import { generateIdeas } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/generate-ideas", async (req, res) => {
    try {
      const requestData = generateIdeasRequestSchema.parse(req.body);
      const ideas = await generateIdeas(requestData);
      res.json({ ideas });
    } catch (error) {
      console.error("Error generating ideas:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Geçersiz istek parametreleri" 
        });
      }
      
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Fikirler üretilirken bir hata oluştu" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
