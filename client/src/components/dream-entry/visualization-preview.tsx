import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { generateVisualization } from "@/lib/canvas-visualizer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface VisualizationPreviewProps {
  visualization: any | null;
  dreamData?: any;
}

export default function VisualizationPreview({ visualization, dreamData }: VisualizationPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleanupFn, setCleanupFn] = useState<(() => void) | null>(null);
  const { toast } = useToast();

  const saveDreamMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/dreams", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dreams"] });
      toast({
        title: "Dream saved",
        description: "Your dream has been saved to your journal with the visualization.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to save dream: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    // Clean up previous visualization if it exists
    if (cleanupFn) {
      cleanupFn();
      setCleanupFn(null);
    }

    if (visualization && canvasRef.current) {
      const canvas = canvasRef.current;
      
      // Set up the canvas for visualization
      const cleanup = generateVisualization(canvas, {
        elements: visualization.elements || [],
        mood: visualization.visualizationSeed?.mood || 'neutral',
        width: canvas.parentElement?.clientWidth || 800,
        height: canvas.parentElement?.clientHeight || 600
      });
      
      setCleanupFn(() => cleanup);
    }

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [visualization]);

  const handleSaveDream = () => {
    if (!dreamData || !visualization) return;

    // Prepare dream data with visualization
    const dreamToSave = {
      ...dreamData,
      elements: visualization.elements,
      interpretation: visualization.interpretation,
      // For a real app, we would save the actual visualization image here
      visualization: "Generated on " + format(new Date(), "PPP")
    };

    saveDreamMutation.mutate(dreamToSave);
  };

  if (!visualization) {
    return null;
  }

  return (
    <motion.section 
      id="visualization-preview" 
      className="py-10 md:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-heading text-3xl font-bold mb-8">Dream Visualization</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 canvas-container bg-neutral-dark rounded-2xl overflow-hidden shadow-xl relative" style={{ height: "400px" }}>
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h3 className="font-heading text-xl font-semibold">
              {dreamData?.title || "Dream Visualization"}
            </h3>
            <p className="text-sm opacity-90">Generated on {format(new Date(), "PPP")}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-white dark:bg-neutral-dark/50 p-6 rounded-xl shadow-md">
          <h3 className="font-heading text-xl font-semibold mb-4">Dream Interpretation</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-neutral-medium mb-4">
              Your dream about{" "}
              <span className="text-primary font-medium">
                {dreamData?.description 
                  ? dreamData.description.split(' ').slice(0, 5).join(' ') + '...' 
                  : "your experiences"}
              </span>{" "}
              may represent:
            </p>
            
            {visualization.interpretation.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className={index === 1 ? "text-sm italic border-l-2 border-accent pl-3 py-1" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              className="w-full px-4 py-3 bg-accent/10 hover:bg-accent/20 text-primary"
              onClick={handleSaveDream}
              disabled={saveDreamMutation.isPending}
            >
              <Download className="mr-2 h-4 w-4" /> 
              {saveDreamMutation.isPending ? "Saving..." : "Save to Dream Journal"}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
