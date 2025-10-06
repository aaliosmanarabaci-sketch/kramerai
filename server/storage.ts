import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getRecentIdeas(filterKey: string): Promise<string[]>;
  addRecentIdeas(filterKey: string, ideaTitles: string[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private recentIdeas: Map<string, string[]>;
  private readonly MAX_CACHED_IDEAS = 30;

  constructor() {
    this.users = new Map();
    this.recentIdeas = new Map();
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRecentIdeas(filterKey: string): Promise<string[]> {
    return this.recentIdeas.get(filterKey) || [];
  }

  async addRecentIdeas(filterKey: string, ideaTitles: string[]): Promise<void> {
    const existing = this.recentIdeas.get(filterKey) || [];
    const combined = [...existing, ...ideaTitles].slice(-this.MAX_CACHED_IDEAS);
    this.recentIdeas.set(filterKey, combined);
  }
}

export const storage = new MemStorage();
