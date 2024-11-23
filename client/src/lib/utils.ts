import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const duration = (duration: string) => {
  const seconds = parseInt(duration.replace('s', ''));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return `${minutes % 60}min`;
  if(minutes % 60 === 0) return `${hours}h`;
  return `${hours}h ${minutes % 60}min`;
}
