import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get relative time (e.g., "2 days ago")
export function getRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}
