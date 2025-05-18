import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import Home from "@/pages/home";
import Journal from "@/pages/journal";
import Gallery from "@/pages/gallery";
import About from "@/pages/about";
import DreamDetail from "@/pages/dream-detail";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/journal" component={Journal} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/dream/:id" component={DreamDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Handle stars animation effect
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;
      
      starsContainer.innerHTML = '';
      const starCount = 50;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        star.style.position = 'absolute';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animation = `pulse ${Math.random() * 3 + 2}s infinite alternate`;
        
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer />
          <MobileNav />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
