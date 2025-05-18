import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PenLine, GalleryHorizontal, LockIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="hero" className="py-10 md:py-16 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-4">
            Capture Your Dreams<span className="text-primary">.</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-neutral-medium">
            Turn your dreams into beautiful visualizations and uncover their hidden meanings.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/journal">
              <Button className="bg-primary hover:bg-primary-dark text-white transition-colors px-6 py-6 rounded-full font-medium shadow-md hover:shadow-lg" size="lg">
                <PenLine className="mr-2 h-5 w-5" /> Record New Dream
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors px-6 py-6 rounded-full font-medium" size="lg">
                <GalleryHorizontal className="mr-2 h-5 w-5" /> View Dream Gallery
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center text-sm text-neutral-medium">
            <LockIcon className="mr-2 h-4 w-4" />
            <span>Your dreams are securely stored on your device.</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="canvas-container aspect-square md:aspect-video bg-neutral-dark/5 dark:bg-white/5 rounded-2xl overflow-hidden shadow-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
            alt="Dream visualization" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 mix-blend-overlay"></div>
        </motion.div>
      </div>
    </section>
  );
}
