import { type User, type InsertUser, type AnalysisResult, type InsertAnalysisResult, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Analysis operations
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getUserAnalysisResults(userId: string, limit?: number): Promise<AnalysisResult[]>;
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;

  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getUserChatMessages(userId: string, limit?: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analysisResults: Map<string, AnalysisResult>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.analysisResults = new Map();
    this.chatMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      username: insertUser.username,
      password: insertUser.password,
      region: insertUser.region ?? null,
      id, 
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createAnalysisResult(insertResult: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = randomUUID();
    const result: AnalysisResult = {
      userId: insertResult.userId ?? null,
      imageUrl: insertResult.imageUrl,
      analysisType: insertResult.analysisType,
      cropType: insertResult.cropType ?? null,
      diagnosis: insertResult.diagnosis,
      recommendations: insertResult.recommendations,
      status: insertResult.status,
      confidence: insertResult.confidence ?? null,
      metadata: insertResult.metadata ?? null,
      id,
      createdAt: new Date()
    };
    this.analysisResults.set(id, result);
    return result;
  }

  async getUserAnalysisResults(userId: string, limit = 10): Promise<AnalysisResult[]> {
    const results = Array.from(this.analysisResults.values())
      .filter(result => result.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return results;
  }

  async getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(id);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      userId: insertMessage.userId ?? null,
      message: insertMessage.message,
      response: insertMessage.response,
      isVoice: insertMessage.isVoice ?? null,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getUserChatMessages(userId: string, limit = 20): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return messages;
  }
}

export const storage = new MemStorage();
