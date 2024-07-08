import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateData() {
  return [
    {
      week: Math.floor(Math.random() * 7),
      date: "13/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "20/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "27/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "3/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "10/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "17/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "24/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "1/7",
    },
  ];
}
