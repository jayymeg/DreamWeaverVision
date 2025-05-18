// A collection of common dream symbols and their interpretations
// Used for the dream interpretation algorithm

export interface DreamSymbol {
  symbol: string;
  keywords: string[];
  interpretation: string;
}

export const dreamSymbols: DreamSymbol[] = [
  {
    symbol: "water",
    keywords: ["water", "ocean", "sea", "river", "lake", "swim", "pool", "rain", "flood"],
    interpretation: "Emotions and the unconscious mind. Calm water often represents inner peace, while turbulent water may suggest emotional turmoil."
  },
  {
    symbol: "flying",
    keywords: ["fly", "flying", "float", "air", "sky", "bird", "wings"],
    interpretation: "Freedom, liberation, and perspective. Flying represents rising above obstacles and gaining a new viewpoint on life situations."
  },
  {
    symbol: "falling",
    keywords: ["fall", "falling", "drop", "plummet", "descend"],
    interpretation: "Insecurity, loss of control, or fear of failure. Falling dreams often occur during times of stress or when you feel overwhelmed."
  },
  {
    symbol: "house",
    keywords: ["house", "home", "building", "room", "door", "apartment"],
    interpretation: "The self and identity. Different rooms may represent different aspects of your personality or life."
  },
  {
    symbol: "being chased",
    keywords: ["chase", "chased", "pursue", "run", "escape", "hide"],
    interpretation: "Avoidance of issues or anxiety. Being chased reflects something you're trying to avoid confronting in your waking life."
  },
  {
    symbol: "darkness",
    keywords: ["dark", "darkness", "night", "shadow", "black"],
    interpretation: "The unknown, uncertainty, or the unconscious. Darkness can represent fear or aspects of yourself you haven't acknowledged."
  },
  {
    symbol: "light",
    keywords: ["light", "bright", "sun", "shine", "glow", "illumination"],
    interpretation: "Clarity, insight, or revelation. Light often suggests understanding, awareness, or spiritual awakening."
  },
  {
    symbol: "teeth",
    keywords: ["teeth", "tooth", "mouth", "bite", "dentist"],
    interpretation: "Anxiety about appearance or communication. Losing teeth is one of the most common stress dreams."
  },
  {
    symbol: "nakedness",
    keywords: ["naked", "nude", "undressed", "clothes", "exposed"],
    interpretation: "Vulnerability, exposure, or authenticity. Being undressed in public often reveals fears of being exposed or judged."
  },
  {
    symbol: "test or exam",
    keywords: ["test", "exam", "school", "study", "fail", "unprepared"],
    interpretation: "Self-evaluation, fear of failure, or feeling tested. These dreams often occur when you feel scrutinized or judged."
  },
  {
    symbol: "forest",
    keywords: ["forest", "tree", "woods", "jungle", "vegetation"],
    interpretation: "The unconscious mind, growth, and life path. Forests can represent exploration of your inner self."
  },
  {
    symbol: "mountains",
    keywords: ["mountain", "hill", "climb", "peak", "summit"],
    interpretation: "Challenges, obstacles, or ambition. Mountains often symbolize goals or the journey toward self-realization."
  },
  {
    symbol: "doors or windows",
    keywords: ["door", "window", "gate", "entrance", "exit", "passage"],
    interpretation: "New opportunities, transitions, or choices. Doors and windows represent pathways to new possibilities."
  },
  {
    symbol: "death",
    keywords: ["death", "dying", "funeral", "cemetery", "grave"],
    interpretation: "Transformation, endings, or change. Death in dreams rarely represents actual death but signifies the end of one phase and beginning of another."
  },
  {
    symbol: "animals",
    keywords: ["animal", "creature", "beast", "pet", "wild"],
    interpretation: "Instincts, emotions, or aspects of your personality. Different animals carry different symbolic meanings."
  },
  {
    symbol: "vehicles",
    keywords: ["car", "vehicle", "drive", "train", "bus", "airplane", "boat"],
    interpretation: "Direction in life or personal journey. Problems with vehicles may suggest feeling out of control in your life path."
  },
  {
    symbol: "money",
    keywords: ["money", "cash", "coin", "wealth", "rich", "poor"],
    interpretation: "Self-worth, value, or power. Money dreams often reflect how you value yourself or your resources."
  },
  {
    symbol: "food",
    keywords: ["food", "eat", "meal", "hungry", "feast", "starve"],
    interpretation: "Nourishment, knowledge, or fulfillment of needs. Food dreams can reflect spiritual or emotional hunger."
  },
  {
    symbol: "mirror",
    keywords: ["mirror", "reflection", "image", "see yourself"],
    interpretation: "Self-image, self-reflection, or identity. Mirrors in dreams invite you to examine how you see yourself."
  },
  {
    symbol: "bridge",
    keywords: ["bridge", "cross", "span", "connect"],
    interpretation: "Transition, change, or connection. Bridges represent moving from one state of being to another."
  }
];

export function interpretDreamElements(elements: string[]): string[] {
  if (!elements || elements.length === 0) return [];
  
  const interpretations: string[] = [];
  const normalizedElements = elements.map(e => e.toLowerCase());
  
  dreamSymbols.forEach(symbol => {
    // Check if any of the dream elements match any of the symbol's keywords
    const matchesKeyword = symbol.keywords.some(keyword => 
      normalizedElements.some(element => element.includes(keyword))
    );
    
    if (matchesKeyword) {
      interpretations.push(`${symbol.symbol.charAt(0).toUpperCase() + symbol.symbol.slice(1)}: ${symbol.interpretation}`);
    }
  });
  
  // If no specific interpretations found, add a general message
  if (interpretations.length === 0) {
    return ["Your dream contains personal symbols that may have unique meaning to you. Consider how these elements relate to your waking life."];
  }
  
  return interpretations;
}
