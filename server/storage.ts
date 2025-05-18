import { dreams, type Dream, type InsertDream } from "@shared/schema";

export interface IStorage {
  getDreams(): Promise<Dream[]>;
  getDream(id: number): Promise<Dream | undefined>;
  createDream(dream: InsertDream): Promise<Dream>;
  updateDream(id: number, dream: Partial<InsertDream>): Promise<Dream | undefined>;
  deleteDream(id: number): Promise<boolean>;
  searchDreams(query: string): Promise<Dream[]>;
}

export class MemStorage implements IStorage {
  private dreams: Map<number, Dream>;
  private currentId: number;

  constructor() {
    this.dreams = new Map();
    this.currentId = 1;
  }

  async getDreams(): Promise<Dream[]> {
    return Array.from(this.dreams.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getDream(id: number): Promise<Dream | undefined> {
    return this.dreams.get(id);
  }

  async createDream(insertDream: InsertDream): Promise<Dream> {
    const id = this.currentId++;
    const now = new Date();
    
    // Ensure elements is properly converted to a string array
    const elements = insertDream.elements ? 
      (Array.isArray(insertDream.elements) ? insertDream.elements : []) : 
      [];
      
    const dream: Dream = { 
      ...insertDream,
      elements: elements,
      id, 
      createdAt: now 
    };
    this.dreams.set(id, dream);
    return dream;
  }

  async updateDream(id: number, update: Partial<InsertDream>): Promise<Dream | undefined> {
    const currentDream = this.dreams.get(id);
    if (!currentDream) return undefined;

    const updatedDream: Dream = {
      ...currentDream,
      ...update,
    };

    this.dreams.set(id, updatedDream);
    return updatedDream;
  }

  async deleteDream(id: number): Promise<boolean> {
    return this.dreams.delete(id);
  }

  async searchDreams(query: string): Promise<Dream[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.dreams.values())
      .filter(dream => 
        dream.title.toLowerCase().includes(lowercaseQuery) ||
        dream.description.toLowerCase().includes(lowercaseQuery) ||
        dream.location?.toLowerCase().includes(lowercaseQuery) ||
        (dream.elements && Array.isArray(dream.elements) && 
          dream.elements.some(element => 
            element.toLowerCase().includes(lowercaseQuery)
          )
        )
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export const storage = new MemStorage();
