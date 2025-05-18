import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronDown } from "lucide-react";
import DreamCard from "./dream-card";
import { cn } from "@/lib/utils";

export default function DreamGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const { toast } = useToast();
  
  const { data: dreams = [], isLoading } = useQuery({
    queryKey: ["/api/dreams"],
  });

  const deleteDreamMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/dreams/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dreams"] });
      toast({
        title: "Dream deleted",
        description: "Your dream has been removed from your journal.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete dream: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        queryClient.invalidateQueries({ queryKey: [`/api/dreams/search/${searchQuery}`] });
      } catch (error) {
        toast({
          title: "Search Error",
          description: "There was an error searching your dreams.",
          variant: "destructive",
        });
      }
    } else {
      queryClient.invalidateQueries({ queryKey: ["/api/dreams"] });
    }
  };

  const handleDelete = (id: number) => {
    deleteDreamMutation.mutate(id);
  };

  return (
    <section id="dream-gallery" className="py-10 md:py-16">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="font-heading text-3xl font-bold">Dream Gallery</h2>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search dreams..."
              className="pl-10 pr-4 py-2 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-medium" />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className={cn("rounded-full", filterActive && "bg-primary text-white")}
            onClick={() => setFilterActive(!filterActive)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-neutral-dark/50 rounded-xl h-[400px] animate-pulse" />
          ))}
        </div>
      ) : dreams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dreams.map((dream, index) => (
            <DreamCard key={dream.id} dream={dream} index={index} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="font-heading text-xl font-semibold mb-2">No dreams yet</h3>
          <p className="text-neutral-medium mb-4">
            Your recorded dreams will appear here. Start by recording your first dream.
          </p>
        </div>
      )}
      
      {dreams.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="flex items-center">
            <span>Load More Dreams</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
