import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { SparklesIcon, PenLine } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="gradient-bg text-white py-4 px-6 shadow-md relative overflow-hidden">
      <div className="stars absolute inset-0 opacity-50 pointer-events-none" id="stars"></div>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-accent animate-float" />
            <h1 className="font-heading text-2xl font-bold">DreamCrafter</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`hover:text-accent transition-colors ${location === '/' ? 'text-accent' : ''}`}>
            Home
          </Link>
          <Link href="/journal" className={`hover:text-accent transition-colors ${location === '/journal' ? 'text-accent' : ''}`}>
            Journal
          </Link>
          <Link href="/gallery" className={`hover:text-accent transition-colors ${location === '/gallery' ? 'text-accent' : ''}`}>
            Gallery
          </Link>
          <Link href="/about" className={`hover:text-accent transition-colors ${location === '/about' ? 'text-accent' : ''}`}>
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/journal" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary-dark transition-colors">
              <PenLine className="mr-2 h-4 w-4" /> New Dream
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
