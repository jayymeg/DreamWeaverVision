interface VisualizationOptions {
  elements: string[];
  mood?: string;
  width: number;
  height: number;
}

// Color palettes based on mood
const moodPalettes: Record<string, string[]> = {
  happy: ["#FFC107", "#FFEB3B", "#FF9800", "#F44336", "#E91E63"],
  scary: ["#212121", "#424242", "#616161", "#757575", "#9E9E9E"],
  peaceful: ["#4CAF50", "#8BC34A", "#CDDC39", "#2196F3", "#03A9F4"],
  confusing: ["#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#009688"],
  exciting: ["#F44336", "#FF9800", "#FFC107", "#FFEB3B", "#FF5722"],
  sad: ["#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#607D8B"],
  anxious: ["#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E"],
  neutral: ["#6D28D9", "#60A5FA", "#8B5CF6", "#C4B5FD", "#A78BFA"]
};

// Shape types for visualization
type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'star' | 'wave';

interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  type: ShapeType;
  speed: number;
  amplitude?: number;
  frequency?: number;
  phase?: number;
}

// Convert a string to a consistent hash number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a shape based on a keyword
function generateShape(keyword: string, width: number, height: number, palette: string[]): Shape {
  const hash = hashString(keyword);
  
  // Use the hash to deterministically generate properties
  const shapeTypes: ShapeType[] = ['circle', 'rectangle', 'triangle', 'star', 'wave'];
  
  return {
    x: hash % width,
    y: (hash * 13) % height,
    size: (hash % 50) + 20, // Size between 20 and 70
    color: palette[hash % palette.length],
    rotation: hash % 360,
    type: shapeTypes[hash % shapeTypes.length],
    speed: (hash % 5) + 1,
    amplitude: (hash % 20) + 10,
    frequency: (hash % 10) + 5,
    phase: hash % 10
  };
}

// Draw a specific shape on the canvas
function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, time: number = 0): void {
  ctx.save();
  ctx.fillStyle = shape.color;
  ctx.translate(shape.x, shape.y);
  ctx.rotate((shape.rotation + time * shape.speed) * Math.PI / 180);
  
  switch (shape.type) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'rectangle':
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      break;
      
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(0, -shape.size / 2);
      ctx.lineTo(shape.size / 2, shape.size / 2);
      ctx.lineTo(-shape.size / 2, shape.size / 2);
      ctx.closePath();
      ctx.fill();
      break;
      
    case 'star':
      const spikes = 5;
      const outerRadius = shape.size / 2;
      const innerRadius = shape.size / 4;
      
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI * i / spikes) - Math.PI / 2;
        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        } else {
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
      }
      ctx.closePath();
      ctx.fill();
      break;
      
    case 'wave':
      if (shape.amplitude && shape.frequency && shape.phase) {
        ctx.beginPath();
        for (let x = -shape.size / 2; x <= shape.size / 2; x++) {
          const y = Math.sin((x + time + shape.phase) / shape.frequency) * shape.amplitude;
          if (x === -shape.size / 2) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = shape.color;
        ctx.stroke();
      }
      break;
  }
  
  ctx.restore();
}

// Draw a gradient background
function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number, mood: string): void {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  const palette = moodPalettes[mood] || moodPalettes.neutral;
  
  // Create a darker, more subdued background
  const darkenColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  gradient.addColorStop(0, darkenColor(palette[0], 100));
  gradient.addColorStop(1, darkenColor(palette[2], 50));
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add some noise/texture to the background
  for (let i = 0; i < width * height / 1000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Add a subtle vignette effect
function addVignette(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, width * 0.7
  );
  
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// Add a bloom/glow effect
function addBloom(ctx: CanvasRenderingContext2D, shapes: Shape[]): void {
  shapes.forEach(shape => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation * Math.PI / 180);
    
    const gradient = ctx.createRadialGradient(
      0, 0, 0,
      0, 0, shape.size
    );
    
    gradient.addColorStop(0, shape.color + 'AA');
    gradient.addColorStop(1, shape.color + '00');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  });
}

// Generate a visualization based on the dream elements and mood
export function generateVisualization(canvas: HTMLCanvasElement, options: VisualizationOptions): () => void {
  const { elements, mood = 'neutral', width, height } = options;
  
  // Make sure the canvas is the right size
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  
  // Use the mood to determine the color palette
  const palette = moodPalettes[mood.toLowerCase()] || moodPalettes.neutral;
  
  // Generate shapes from the dream elements
  const shapes: Shape[] = elements.map(element => 
    generateShape(element, width, height, palette)
  );
  
  // Add some random shapes based on the mood
  for (let i = 0; i < 5; i++) {
    shapes.push(generateShape(mood + i, width, height, palette));
  }
  
  let animationFrameId: number;
  let startTime = Date.now();
  
  // Animation function
  const animate = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    drawBackground(ctx, width, height, mood);
    
    // Add bloom effect first as background glow
    addBloom(ctx, shapes);
    
    // Draw all shapes
    shapes.forEach(shape => {
      // Update position for some animation
      shape.x += Math.sin(elapsed * 0.5 + shape.phase!) * 0.5;
      shape.y += Math.cos(elapsed * 0.5 + shape.phase!) * 0.5;
      
      drawShape(ctx, shape, elapsed);
    });
    
    // Add vignette as final touch
    addVignette(ctx, width, height);
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start the animation
  animate();
  
  // Return a cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
