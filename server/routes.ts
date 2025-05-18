import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDreamSchema, generateVisualizationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET all dreams
  app.get('/api/dreams', async (req, res) => {
    try {
      const dreams = await storage.getDreams();
      res.json(dreams);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dreams' });
    }
  });

  // GET a specific dream by ID
  app.get('/api/dreams/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid dream ID' });
      }

      const dream = await storage.getDream(id);
      if (!dream) {
        return res.status(404).json({ message: 'Dream not found' });
      }

      res.json(dream);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dream' });
    }
  });

  // POST a new dream
  app.post('/api/dreams', async (req, res) => {
    try {
      const dreamData = insertDreamSchema.parse(req.body);
      const newDream = await storage.createDream(dreamData);
      res.status(201).json(newDream);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: validationError.details
        });
      }
      res.status(500).json({ message: 'Failed to create dream' });
    }
  });

  // PUT (update) a dream
  app.put('/api/dreams/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid dream ID' });
      }

      // Partially validate the update data
      const updateData = insertDreamSchema.partial().parse(req.body);
      
      const updatedDream = await storage.updateDream(id, updateData);
      if (!updatedDream) {
        return res.status(404).json({ message: 'Dream not found' });
      }

      res.json(updatedDream);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: validationError.details
        });
      }
      res.status(500).json({ message: 'Failed to update dream' });
    }
  });

  // DELETE a dream
  app.delete('/api/dreams/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid dream ID' });
      }

      const deleted = await storage.deleteDream(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Dream not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete dream' });
    }
  });

  // SEARCH dreams
  app.get('/api/dreams/search/:query', async (req, res) => {
    try {
      const query = req.params.query;
      const results = await storage.searchDreams(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search dreams' });
    }
  });

  // Generate visualization and interpretation endpoint
  app.post('/api/generate', async (req, res) => {
    try {
      const data = generateVisualizationSchema.parse(req.body);
      
      // Simple algorithmic "AI" interpretation based on keywords
      const elements = [...(data.elements || [])];
      if (data.description) {
        // Extract potential keywords from description
        const words = data.description.toLowerCase().split(/\s+/);
        const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of']);
        
        words.forEach(word => {
          // Filter out common words and words already in elements
          if (!commonWords.has(word) && word.length > 3 && !elements.includes(word)) {
            elements.push(word);
          }
        });
      }
      
      // Generate a simple interpretation
      let interpretation = "Your dream suggests themes of: ";
      
      // Simple deterministic interpretation algorithm
      const interpretations: string[] = [];
      
      elements.forEach(element => {
        const normalizedElement = element.toLowerCase();
        
        if (normalizedElement.includes('water') || normalizedElement.includes('ocean') || normalizedElement.includes('river')) {
          interpretations.push("Emotions and the unconscious mind");
        } else if (normalizedElement.includes('fly') || normalizedElement.includes('air') || normalizedElement.includes('bird')) {
          interpretations.push("Freedom and perspective");
        } else if (normalizedElement.includes('fall') || normalizedElement.includes('drop')) {
          interpretations.push("Insecurity or loss of control");
        } else if (normalizedElement.includes('house') || normalizedElement.includes('home')) {
          interpretations.push("Self and identity");
        } else if (normalizedElement.includes('chase') || normalizedElement.includes('run')) {
          interpretations.push("Avoidance of issues or anxiety");
        } else if (normalizedElement.includes('dark') || normalizedElement.includes('night')) {
          interpretations.push("The unknown or uncertainty");
        } else if (normalizedElement.includes('light') || normalizedElement.includes('sun')) {
          interpretations.push("Clarity or revelation");
        } else if (normalizedElement.includes('teeth') || normalizedElement.includes('tooth')) {
          interpretations.push("Anxiety or concerns about appearance");
        } else if (normalizedElement.includes('naked') || normalizedElement.includes('cloth')) {
          interpretations.push("Vulnerability or exposure");
        } else if (normalizedElement.includes('test') || normalizedElement.includes('exam')) {
          interpretations.push("Self-evaluation or fear of failure");
        } else if (normalizedElement.includes('forest') || normalizedElement.includes('tree')) {
          interpretations.push("Growth and life path");
        } else if (normalizedElement.includes('mountain')) {
          interpretations.push("Challenges and obstacles to overcome");
        } else if (normalizedElement.includes('door') || normalizedElement.includes('window')) {
          interpretations.push("New opportunities or transitions");
        } else if (normalizedElement.includes('death')) {
          interpretations.push("Transformation and change");
        } else {
          // For other elements, return a generic meaningful interpretation
          interpretations.push(`Personal significance related to "${element}"`);
        }
      });
      
      // Add mood-based interpretation if provided
      if (data.mood) {
        switch(data.mood.toLowerCase()) {
          case 'happy':
            interpretations.push("Contentment or wish fulfillment");
            break;
          case 'scary':
            interpretations.push("Processing fears or anxieties");
            break;
          case 'peaceful':
            interpretations.push("Inner harmony or resolved conflicts");
            break;
          case 'confusing':
            interpretations.push("Unprocessed emotions or thoughts");
            break;
          case 'exciting':
            interpretations.push("Anticipation or desire for stimulation");
            break;
          case 'sad':
            interpretations.push("Processing grief or disappointment");
            break;
          case 'anxious':
            interpretations.push("Unresolved tensions or worries");
            break;
        }
      }
      
      // Make the interpretation unique
      const uniqueInterSet = new Set<string>(interpretations);
      const uniqueInterpretations = Array.from(uniqueInterSet);
      
      if (uniqueInterpretations.length > 0) {
        interpretation += uniqueInterpretations.join(", ") + ".";
      } else {
        interpretation += "Personal exploration and self-discovery.";
      }
      
      // Add a disclaimer
      interpretation += "\n\nRemember that dream interpretation is subjective, and personal context may provide deeper meaning.";
      
      // Return the visualization seed (would be used by canvas) and interpretation
      res.json({
        elements: elements,
        interpretation: interpretation,
        // The visualization would be created client-side using canvas
        visualizationSeed: {
          elements: elements,
          mood: data.mood || 'neutral'
        }
      });
      
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: validationError.details
        });
      }
      res.status(500).json({ message: 'Failed to generate visualization' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
