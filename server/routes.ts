import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisResultSchema, insertChatMessageSchema } from "@shared/schema";
import { analyzeCropImage, analyzeSoilImage, generateChatResponse } from "./services/openai";
import { getWeatherForRegion } from "./services/weather";
import multer from "multer";
import rateLimit from "express-rate-limit";

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Rate limiters
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: { message: "Too many requests. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {

  // ─── Auth Routes ─────────────────────────────────────────────────────────────

  app.post("/api/auth/register", authLimiter, async (req, res) => {
    try {
      const { phone, pin, name, region } = req.body;
      if (!phone || !pin || !name || !region) {
        return res.status(400).json({ message: "Missing required fields: phone, pin, name, region" });
      }
      if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        return res.status(400).json({ message: "PIN must be exactly 4 digits" });
      }
      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Phone must be a 10-digit number" });
      }
      const user = await storage.createAuthUser(phone, pin, name, region);
      (req.session as any).userId = user.id;
      (req.session as any).phone = user.phone;
      res.json({ id: user.id, name: user.name, region: user.region, phone: user.phone });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { phone, pin } = req.body;
      if (!phone || !pin) {
        return res.status(400).json({ message: "Missing phone or PIN" });
      }
      const user = await storage.verifyAuthUser(phone, pin);
      if (!user) {
        return res.status(401).json({ message: "Invalid phone number or PIN" });
      }
      (req.session as any).userId = user.id;
      (req.session as any).phone = user.phone;
      res.json({ id: user.id, name: user.name, region: user.region, phone: user.phone });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getAuthUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json({ id: user.id, name: user.name, region: user.region, phone: user.phone });
  });

  // ─── Image Analysis ───────────────────────────────────────────────────────────

  app.post("/api/analyze-image", aiLimiter, upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const { analysisType, userId } = req.body;
      const requestedLanguage = typeof req.body.language === "string" ? req.body.language : "en";
      
      if (!analysisType || !userId) {
        return res.status(400).json({ message: "Missing required fields: analysisType, userId" });
      }

      const base64Image = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype || 'image/jpeg';
      
      let analysisResult;
      let resultData;

      if (analysisType === 'crop') {
        analysisResult = await analyzeCropImage(base64Image, mimeType, requestedLanguage);
        resultData = {
          userId,
          imageUrl: `data:${req.file.mimetype};base64,${base64Image}`,
          analysisType: 'crop',
          cropType: analysisResult.cropType,
          diagnosis: analysisResult.diagnosis,
          recommendations: analysisResult.recommendations,
          status: analysisResult.status,
          confidence: analysisResult.confidence,
          metadata: {
            language: requestedLanguage,
            treatmentSteps: analysisResult.treatmentSteps,
            preventiveMeasures: analysisResult.preventiveMeasures
          }
        };
      } else if (analysisType === 'soil') {
        analysisResult = await analyzeSoilImage(base64Image, mimeType, requestedLanguage);
        resultData = {
          userId,
          imageUrl: `data:${req.file.mimetype};base64,${base64Image}`,
          analysisType: 'soil',
          cropType: null,
          diagnosis: analysisResult.diagnosis,
          recommendations: analysisResult.recommendations,
          status: analysisResult.status,
          confidence: analysisResult.confidence,
          metadata: {
            language: requestedLanguage,
            soilType: analysisResult.soilType,
            phLevel: analysisResult.phLevel,
            fertility: analysisResult.fertility,
            improvements: analysisResult.improvements
          }
        };
      } else {
        return res.status(400).json({ message: "Invalid analysis type. Must be 'crop' or 'soil'" });
      }

      const validatedData = insertAnalysisResultSchema.parse(resultData);
      const savedResult = await storage.createAnalysisResult(validatedData);
      res.json(savedResult);
    } catch (error) {
      console.error("Error analyzing image:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze image" 
      });
    }
  });

  // Get user's analysis results
  app.get("/api/analysis-results/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { limit } = req.query;
      const results = await storage.getUserAnalysisResults(
        userId, 
        limit ? parseInt(limit as string) : undefined
      );
      res.json(results);
    } catch (error) {
      console.error("Error fetching analysis results:", error);
      res.status(500).json({ message: "Failed to fetch analysis results" });
    }
  });

  // Get specific analysis result
  app.get("/api/analysis-result/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await storage.getAnalysisResult(id);
      if (!result) {
        return res.status(404).json({ message: "Analysis result not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching analysis result:", error);
      res.status(500).json({ message: "Failed to fetch analysis result" });
    }
  });

  // ─── Chat ─────────────────────────────────────────────────────────────────────

  app.post("/api/chat", aiLimiter, async (req, res) => {
    try {
      const { message, userId, isVoice, userRegion, userName, primaryCrop } = req.body;
      
      if (!message || !userId) {
        return res.status(400).json({ message: "Missing required fields: message, userId" });
      }

      const chatResponse = await generateChatResponse(message, userRegion, userName, primaryCrop);
      
      const chatData = {
        userId,
        message,
        response: chatResponse.response,
        isVoice: isVoice ? "true" : "false"
      };

      const validatedData = insertChatMessageSchema.parse(chatData);
      const savedMessage = await storage.createChatMessage(validatedData);

      res.json({
        ...savedMessage,
        relatedTopics: chatResponse.relatedTopics,
        actionable: chatResponse.actionable
      });
    } catch (error) {
      console.error("Error processing chat:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process chat message" 
      });
    }
  });

  // Get user's chat history
  app.get("/api/chat-history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { limit } = req.query;
      const messages = await storage.getUserChatMessages(
        userId, 
        limit ? parseInt(limit as string) : undefined
      );
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // ─── Weather ──────────────────────────────────────────────────────────────────

  app.get("/api/weather", async (req, res) => {
    try {
      const region = (req.query.region as string) || "Maharashtra";
      const weather = await getWeatherForRegion(region);
      res.json(weather);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // ─── Health ───────────────────────────────────────────────────────────────────

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "KrishiMitra API" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
