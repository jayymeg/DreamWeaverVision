import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("container mx-auto px-4 py-8 mb-20 md:mb-0", className)}>
      {children}
    </main>
  );
}
