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
        <Link href="/">
          <a className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-accent animate-float" />
            <h1 className="font-heading text-2xl font-bold">DreamCrafter</h1>
          </a>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={`hover:text-accent transition-colors ${location === '/' ? 'text-accent' : ''}`}>Home</a>
          </Link>
          <Link href="/journal">
            <a className={`hover:text-accent transition-colors ${location === '/journal' ? 'text-accent' : ''}`}>Journal</a>
          </Link>
          <Link href="/gallery">
            <a className={`hover:text-accent transition-colors ${location === '/gallery' ? 'text-accent' : ''}`}>Gallery</a>
          </Link>
          <Link href="/about">
            <a className={`hover:text-accent transition-colors ${location === '/about' ? 'text-accent' : ''}`}>About</a>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/journal">
            <Button className="hidden md:flex bg-primary hover:bg-primary-dark transition-colors">
              <PenLine className="mr-2 h-4 w-4" /> New Dream
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
