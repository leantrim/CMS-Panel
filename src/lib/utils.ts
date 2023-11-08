import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export function convertToTitleCase(str: string) {
  // Split the string into words
  const words = str.split(/(?=[A-Z])/);

  // Convert each word to title case
  const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  // Join the words back together with spaces
  const titleCaseStr = titleCaseWords.join(' ');

  return titleCaseStr;
}
