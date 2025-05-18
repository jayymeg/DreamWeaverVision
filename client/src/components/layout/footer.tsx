import { Link } from "wouter";
import { SparklesIcon, Twitter, Instagram, Github, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <SparklesIcon className="w-6 h-6 text-accent" />
              <h3 className="font-heading text-xl font-semibold">DreamCrafter</h3>
            </div>
            <p className="text-gray-400 mb-4">Explore the hidden meanings in your dreams and transform them into beautiful visualizations.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/journal">
                  <a className="text-gray-400 hover:text-white transition-colors">Dream Journal</a>
                </Link>
              </li>
              <li>
                <Link href="/journal">
                  <a className="text-gray-400 hover:text-white transition-colors">AI Visualization</a>
                </Link>
              </li>
              <li>
                <Link href="/journal">
                  <a className="text-gray-400 hover:text-white transition-colors">Dream Interpretation</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-gray-400 hover:text-white transition-colors">Dream Gallery</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Dream Dictionary</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Sleep Science</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Lucid Dreaming</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for dream insights and app updates.</p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-l-lg bg-gray-800 border-gray-700 focus:border-primary focus:ring focus:ring-primary/20 text-white"
              />
              <Button type="submit" className="bg-primary hover:bg-primary-dark rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2023 DreamCrafter. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
