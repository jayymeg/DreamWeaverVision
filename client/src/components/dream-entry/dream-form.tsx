import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertDreamSchema, type InsertDream, generateVisualizationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { CalendarIcon, WandSparkles } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag-input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DreamFormProps {
  onGenerateVisualization: (data: any) => void;
}

export default function DreamForm({ onGenerateVisualization }: DreamFormProps) {
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<InsertDream>({
    resolver: zodResolver(insertDreamSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      mood: "",
      clarity: "",
      location: "",
      elements: [],
    },
  });

  const createDreamMutation = useMutation({
    mutationFn: async (data: InsertDream) => {
      const response = await apiRequest("POST", "/api/dreams", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dreams"] });
      toast({
        title: "Dream saved",
        description: "Your dream has been saved to your journal.",
      });
      form.reset();
      setTags([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to save dream: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const generateVisualizationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      onGenerateVisualization(data);
      toast({
        title: "Visualization generated",
        description: "Your dream visualization has been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to generate visualization: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDream) => {
    // Include tags in elements
    data.elements = tags;
    createDreamMutation.mutate(data);
  };

  const handleGenerateVisualization = () => {
    const description = form.getValues("description");
    const mood = form.getValues("mood");
    
    try {
      const validData = generateVisualizationSchema.parse({
        description,
        elements: tags,
        mood,
      });
      
      generateVisualizationMutation.mutate(validData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please provide at least a description of your dream.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="dream-entry" className="py-10 md:py-16 bg-white dark:bg-neutral-dark/50 rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="font-heading text-3xl font-bold mb-8">Record Your Dream</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dream Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Give your dream a title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dream Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your dream in detail..." 
                    className="resize-none" 
                    rows={6} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mood</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="scary">Scary</SelectItem>
                      <SelectItem value="peaceful">Peaceful</SelectItem>
                      <SelectItem value="confusing">Confusing</SelectItem>
                      <SelectItem value="exciting">Exciting</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clarity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clarity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vivid">Vivid</SelectItem>
                      <SelectItem value="clear">Clear</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="fuzzy">Fuzzy</SelectItem>
                      <SelectItem value="vague">Vague</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Where did it take place?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="elements"
            render={() => (
              <FormItem>
                <FormLabel>Key Elements</FormLabel>
                <FormControl>
                  <TagInput
                    tags={tags}
                    onTagsChange={setTags}
                    placeholder="Add element and press Enter..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              disabled={createDreamMutation.isPending}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={handleGenerateVisualization}
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={generateVisualizationMutation.isPending}
            >
              <WandSparkles className="mr-2 h-4 w-4" /> 
              {generateVisualizationMutation.isPending ? "Generating..." : "Generate Visualization"}
            </Button>
            <Button 
              type="submit" 
              disabled={createDreamMutation.isPending}
            >
              {createDreamMutation.isPending ? "Saving..." : "Save Dream"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
