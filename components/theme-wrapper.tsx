"use client";

import "@/app/themes.css";
import { cn } from "@/lib/utils";

export function ThemeWrapper({
  children,
  theme,
}: Readonly<{
  children: React.ReactNode;
  theme: string;
}>) {
  return <div className={cn(theme && `theme-${theme}`)}>{children}</div>;
}
