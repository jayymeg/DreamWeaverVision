import { Dream } from "@shared/schema";
import { format } from "date-fns";
import { MoreHorizontal, SmilePlus } from "lucide-react";
import { Link } from "wouter";
import { getRelativeTime } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface DreamCardProps {
  dream: Dream;
  index?: number;
  onDelete?: (id: number) => void;
}

export default function DreamCard({ dream, index = 0, onDelete }: DreamCardProps) {
  // Derive a consistent image based on dream content
  const getMoodBasedImage = (mood: string) => {
    const moodImages: Record<string, string> = {
      happy: "https://images.unsplash.com/photo-1520590878786-2f369e1b8d4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      scary: "https://images.unsplash.com/photo-1551274149-cc5d10912118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      peaceful: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      confusing: "https://images.unsplash.com/photo-1519331582073-283f1a211a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      exciting: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      sad: "https://images.unsplash.com/photo-1541535198517-3ec116549c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      anxious: "https://images.unsplash.com/photo-1548778052-311f4bc2b502?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    };
    
    return dream.mood && moodImages[dream.mood.toLowerCase()] 
      ? moodImages[dream.mood.toLowerCase()]
      : "https://images.unsplash.com/photo-1599532767600-d846e5a6dce5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="dream-card group relative bg-white dark:bg-neutral-dark/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="h-48 overflow-hidden">
          <img 
            src={getMoodBasedImage(dream.mood || '')} 
            alt={`Abstract visualization for ${dream.title}`} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="font-heading text-lg font-semibold">{dream.title}</CardTitle>
            <span className="text-xs text-neutral-medium">
              {getRelativeTime(new Date(dream.date))}
            </span>
          </div>
          
          <p className="text-neutral-medium line-clamp-2 mb-3">{dream.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {dream.elements && Array.isArray(dream.elements) && dream.elements.slice(0, 3).map((element, idx) => (
              <span key={idx} className="bg-accent/10 text-primary-dark px-2 py-0.5 rounded-full text-xs">
                {element}
              </span>
            ))}
            {dream.elements && Array.isArray(dream.elements) && dream.elements.length > 3 && (
              <span className="bg-accent/5 text-primary-dark px-2 py-0.5 rounded-full text-xs">
                +{dream.elements.length - 3} more
              </span>
            )}
          </div>
          
          <CardFooter className="flex justify-between items-center p-0">
            <span className="inline-flex items-center text-sm text-neutral-medium">
              <SmilePlus className="mr-1 h-4 w-4" /> {dream.mood || "Neutral"}
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:text-primary-dark transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/dream/${dream.id}`}>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onSelect={() => {
                  if (window.confirm('Are you sure you want to delete this dream?')) {
                    onDelete && onDelete(dream.id);
                  }
                }}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.div>
  );
}
