import { Link, useLocation } from "wouter";
import { Home, BookOpen, GalleryThumbnails, User, PenLine } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-dark shadow-lg z-50 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around items-center p-3">
        <Link href="/" className={`flex flex-col items-center ${isActive('/') ? 'text-primary' : 'text-neutral-medium hover:text-primary transition-colors'}`}>
            <Home className="text-xl" />
            <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/journal" className={`flex flex-col items-center ${isActive('/journal') ? 'text-primary' : 'text-neutral-medium hover:text-primary transition-colors'}`}>
            <BookOpen className="text-xl" />
            <span className="text-xs mt-1">Journal</span>
        </Link>
        <Link href="/journal" className="flex flex-col items-center">
            <div className="bg-primary rounded-full p-3 -mt-8 shadow-lg">
              <PenLine className="text-xl text-white" />
            </div>
            <span className="text-xs mt-1">New</span>
        </Link>
        <Link href="/gallery" className={`flex flex-col items-center ${isActive('/gallery') ? 'text-primary' : 'text-neutral-medium hover:text-primary transition-colors'}`}>
            <GalleryThumbnails className="text-xl" />
            <span className="text-xs mt-1">Gallery</span>
        </Link>
        <Link href="/about" className={`flex flex-col items-center ${isActive('/about') ? 'text-primary' : 'text-neutral-medium hover:text-primary transition-colors'}`}>
            <User className="text-xl" />
            <span className="text-xs mt-1">About</span>
        </Link>
      </div>
    </div>
  );
}
