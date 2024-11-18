"use client";

import { Button } from "@/components/ui/button";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { CircleAlert, CircleCheck, Loader } from "lucide-react";
import { useTransition } from "react";

type THabitToggle = {
  id: string;
  date: string;
  isRecorded: boolean;
};

export default function HabitToggle({ id, date, isRecorded }: THabitToggle) {
  const [isPending, startTransition] = useTransition();

  async function handleToggleRecord() {
    startTransition(async () => {
      await toggleRecord(id, new Date(date));
    });
  }

  return (
    <Button
      variant={isRecorded ? "secondary" : "outline"}
      size="lg"
      className="w-full text-xs shadow-none"
      onMouseDown={() => handleToggleRecord()}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="h-4 w-4 mr-1 animate-spin" />
      ) : isRecorded ? (
        <CircleCheck className="h-4 w-4 mr-1" />
      ) : (
        <CircleAlert className="h-4 w-4 mr-1" />
      )}
      {isPending ? "" : isRecorded ? "Completed" : "Todo"}
    </Button>
  );
}
