import { type User, type InsertUser, type AnalysisResult, type InsertAnalysisResult, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID, scryptSync, randomBytes, timingSafeEqual } from "crypto";

export interface AuthUser {
  id: string;
  phone: string;
  pinHash: string;
  name: string;
  region: string;
  createdAt: Date;
}

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Phone auth operations
  getAuthUserByPhone(phone: string): Promise<AuthUser | undefined>;
  createAuthUser(phone: string, pin: string, name: string, region: string): Promise<AuthUser>;
  verifyAuthUser(phone: string, pin: string): Promise<AuthUser | null>;
  getAuthUser(id: string): Promise<AuthUser | undefined>;

  // Analysis operations
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getUserAnalysisResults(userId: string, limit?: number): Promise<AnalysisResult[]>;
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;

  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getUserChatMessages(userId: string, limit?: number): Promise<ChatMessage[]>;
}

function hashPin(pin: string, salt?: string): { hash: string; salt: string } {
  const s = salt || randomBytes(16).toString('hex');
  const hash = scryptSync(pin, s, 64).toString('hex');
  return { hash: `${s}:${hash}`, salt: s };
}

function verifyPin(pin: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':');
    const { hash: newHash } = hashPin(pin, salt);
    const [, newHashOnly] = newHash.split(':');
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(newHashOnly, 'hex'));
  } catch {
    return false;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private authUsers: Map<string, AuthUser>;
  private authUsersByPhone: Map<string, string>;
  private analysisResults: Map<string, AnalysisResult>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.authUsers = new Map();
    this.authUsersByPhone = new Map();
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

  async getAuthUserByPhone(phone: string): Promise<AuthUser | undefined> {
    const id = this.authUsersByPhone.get(phone);
    if (!id) return undefined;
    return this.authUsers.get(id);
  }

  async createAuthUser(phone: string, pin: string, name: string, region: string): Promise<AuthUser> {
    if (this.authUsersByPhone.has(phone)) {
      throw new Error("Phone number already registered");
    }
    const id = randomUUID();
    const { hash: pinHash } = hashPin(pin);
    const user: AuthUser = { id, phone, pinHash, name, region, createdAt: new Date() };
    this.authUsers.set(id, user);
    this.authUsersByPhone.set(phone, id);
    return user;
  }

  async verifyAuthUser(phone: string, pin: string): Promise<AuthUser | null> {
    const user = await this.getAuthUserByPhone(phone);
    if (!user) return null;
    if (!verifyPin(pin, user.pinHash)) return null;
    return user;
  }

  async getAuthUser(id: string): Promise<AuthUser | undefined> {
    return this.authUsers.get(id);
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
