import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import PageContainer from "@/components/layout/page-container";
import { generateVisualization } from "@/lib/canvas-visualizer";
import { 
  ArrowLeft, 
  CalendarIcon, 
  MapPinIcon, 
  EyeIcon, 
  SmilePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

export default function DreamDetail() {
  const [match, params] = useRoute('/dream/:id');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = params?.id ? parseInt(params.id) : null;

  const { data: dream, isLoading } = useQuery({
    queryKey: [`/api/dreams/${id}`],
    enabled: !!id,
  });

  useEffect(() => {
    if (dream && canvasRef.current) {
      const canvas = canvasRef.current;
      
      // Set up the canvas for visualization
      const cleanup = generateVisualization(canvas, {
        elements: dream.elements || [],
        mood: dream.mood || 'neutral',
        width: canvas.parentElement?.clientWidth || 800,
        height: 400
      });
      
      return () => {
        cleanup();
      };
    }
  }, [dream]);

  if (!match) {
    return <div>Not found</div>;
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center mb-6">
          <Link href="/gallery">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-[400px] w-full mb-6 rounded-xl" />
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <div>
            <Skeleton className="h-[200px] w-full rounded-xl mb-6" />
            <Skeleton className="h-6 w-36 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!dream) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="font-heading text-2xl font-semibold mb-4">Dream Not Found</h2>
          <p className="text-neutral-medium mb-6">This dream may have been deleted or doesn't exist.</p>
          <Link href="/gallery">
            <Button>Return to Gallery</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{dream.title} - DreamCrafter</title>
        <meta 
          name="description" 
          content={`View details and visualization for your dream: ${dream.title}. Recorded on ${format(new Date(dream.date), 'PPP')}.`} 
        />
      </Helmet>
      <PageContainer>
        <div className="flex items-center mb-6">
          <Link href="/gallery">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
          <h1 className="font-heading text-3xl font-bold">{dream.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="canvas-container bg-neutral-dark rounded-2xl overflow-hidden shadow-xl mb-6" style={{ height: "400px" }}>
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center mb-6">
              <div className="flex items-center text-neutral-medium mr-4">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{format(new Date(dream.date), 'PPP')}</span>
              </div>
              
              {dream.mood && (
                <div className="flex items-center text-neutral-medium mr-4">
                  <SmilePlus className="h-4 w-4 mr-1" />
                  <span>{dream.mood}</span>
                </div>
              )}
              
              {dream.clarity && (
                <div className="flex items-center text-neutral-medium mr-4">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  <span>{dream.clarity} clarity</span>
                </div>
              )}
              
              {dream.location && (
                <div className="flex items-center text-neutral-medium">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{dream.location}</span>
                </div>
              )}
            </div>
            
            <h2 className="font-heading text-2xl font-semibold mb-3">Dream Description</h2>
            <div className="bg-white dark:bg-neutral-dark/50 p-6 rounded-xl mb-6">
              <p className="whitespace-pre-wrap">{dream.description}</p>
            </div>
            
            {dream.elements && Array.isArray(dream.elements) && dream.elements.length > 0 && (
              <div className="mb-6">
                <h3 className="font-heading text-xl font-semibold mb-3">Key Elements</h3>
                <div className="flex flex-wrap gap-2">
                  {dream.elements.map((element, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-accent/10 text-primary hover:bg-accent/20">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-semibold mb-4">Dream Interpretation</h2>
                {dream.interpretation ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">{dream.interpretation}</p>
                  </div>
                ) : (
                  <p className="text-neutral-medium italic">
                    No interpretation available for this dream. Generate a visualization to receive an interpretation.
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading text-xl font-semibold mb-3">Additional Notes</h3>
                <p className="text-neutral-medium mb-4">
                  Record any reflections or connections you've made about this dream.
                </p>
                <textarea 
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring focus:ring-primary/20 bg-white dark:bg-neutral-dark transition-colors"
                  rows={4}
                  placeholder="Your personal notes about this dream..."
                ></textarea>
                <Button className="mt-3 w-full">Save Notes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
