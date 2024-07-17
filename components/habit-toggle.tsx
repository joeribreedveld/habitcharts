"use client";

import { Button } from "./ui/button";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { CircleAlert, CircleCheck, Loader, LoaderCircle } from "lucide-react";
import { Suspense, useTransition } from "react";

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
    <Suspense fallback={<LoaderCircle className="h-8 w-8" />}>
      <Button
        variant={isRecorded ? "secondary" : "outline"}
        size="lg"
        className="mt-2 w-full text-xs"
        onClick={() => handleToggleRecord()}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="h-4 w-4 mr-2 animate-spin" />
        ) : isRecorded ? (
          <CircleCheck className="h-4 w-4 mr-2" />
        ) : (
          <CircleAlert className="h-4 w-4 mr-2" />
        )}
        {isPending ? "" : isRecorded ? "Completed" : "Todo"}
      </Button>
    </Suspense>
  );
}