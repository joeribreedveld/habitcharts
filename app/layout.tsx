import "@/app/globals.css";
import HabitHeader from "@/components/habit-header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

type TLayout = Readonly<{
  children: React.ReactNode;
}>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: TLayout) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full flex flex-col")}>
        {children}
      </body>
    </html>
  );
}
