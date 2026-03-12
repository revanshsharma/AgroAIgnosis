import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisResultSchema, insertChatMessageSchema } from "@shared/schema";
import { analyzeCropImage, analyzeSoilImage, generateChatResponse } from "./services/openai";
import multer from "multer";

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Image analysis endpoint
  app.post("/api/analyze-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const { analysisType, userId } = req.body;
      
      if (!analysisType || !userId) {
        return res.status(400).json({ message: "Missing required fields: analysisType, userId" });
      }

      // Convert buffer to base64
      const base64Image = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype || 'image/jpeg';
      
      let analysisResult;
      let resultData;

      if (analysisType === 'crop') {
        analysisResult = await analyzeCropImage(base64Image, mimeType);
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
            treatmentSteps: analysisResult.treatmentSteps,
            preventiveMeasures: analysisResult.preventiveMeasures
          }
        };
      } else if (analysisType === 'soil') {
        analysisResult = await analyzeSoilImage(base64Image, mimeType);
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
            soilType: analysisResult.soilType,
            phLevel: analysisResult.phLevel,
            fertility: analysisResult.fertility,
            improvements: analysisResult.improvements
          }
        };
      } else {
        return res.status(400).json({ message: "Invalid analysis type. Must be 'crop' or 'soil'" });
      }

      // Validate and store the result
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

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, userId, isVoice, userRegion } = req.body;
      
      if (!message || !userId) {
        return res.status(400).json({ message: "Missing required fields: message, userId" });
      }

      // Generate AI response
      const chatResponse = await generateChatResponse(message, userRegion);
      
      // Store chat message and response
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

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "KrishiMitra API" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
