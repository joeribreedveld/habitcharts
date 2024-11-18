"use client";

import HabitCreate from "@/components/habit-create";
import { Button } from "@/components/ui/button";
import { CircleHelpIcon } from "lucide-react";
import { useState } from "react";

export default function HabitHeader() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center px-4 mt-12 sm:container">
      <div>
        <div className="flex gap-3 items-center">
          <h1 className="text-lg font-semibold">Habitcharts</h1>
          {/* <CircleHelpIcon className="w-5 h-5 text-muted-foreground" /> */}
        </div>
        <p className="text-muted-foreground">
          Track your habits and reach your goals
        </p>
      </div>
      {/* <Link href="/settings">
          <Button variant="secondary">Settings</Button>
        </Link> */}
      <Button
        size="lg"
        className="sm:w-fit shadow-none w-full"
        onMouseDown={() => setIsCreateDialogOpen(true)}
      >
        New Habit
      </Button>

      <HabitCreate
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />
    </header>
  );
}
