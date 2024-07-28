"use client";

import HabitCreate from "@/components/habit-create";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function HabitHeader() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center px-4 mt-12 sm:container">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Habitcharts</h1>
        <p className="text-muted-foreground">
          Track your habits and reach your goals.
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* <Link href="/settings">
          <Button variant="secondary">Settings</Button>
        </Link> */}
        <Button onClick={() => setIsCreateDialogOpen(true)}>New habit</Button>
      </div>

      <HabitCreate
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </header>
  );
}
