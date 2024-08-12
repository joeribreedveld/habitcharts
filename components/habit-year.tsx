"use client";

import { THabitWeek } from "@/lib/types/habit-types";
import { cn } from "@/lib/utils";
import { isSameDay, startOfWeek, startOfYear } from "date-fns";
import { useEffect, useMemo, useState } from "react";

// show 7 gray blocks and i f the blocks are used make them primary

export default function HabitYear({ target, records }: THabitWeek) {
  const memoizedRecords = useMemo(() => {
    return records.map((record) => new Date(record.date));
  }, [records]);

  //   7 days starting from first day of current week
  const dates = Array.from({ length: 112 }, (_, i) => {
    const date = startOfYear(new Date());
    date.setDate(date.getDate() - date.getDay() + i + 1);
    return date;
  });

  //   const memoizedDates = useMemo(() => {
  //     const dates = Array.from({ length: 7 }, (_, i) => {
  //       const date = startOfWeek(new Date());
  //       date.setDate(date.getDate() - date.getDay() + i);
  //       return date;
  //     });

  //     return dates;
  //   }, []);

  // write the date on the blocks, and if the day is used make it primary

  return (
    <div className="gap-1 grid grid-rows-7 grid-flow-col auto-cols-max">
      {dates.map((date) => (
        <div
          key={date.toISOString()}
          className={cn(
            "w-4 aspect-square rounded-sm text-white text-sm flex items-center justify-center",
            memoizedRecords.some((record) => isSameDay(record, date))
              ? "bg-primary"
              : "bg-primary/10 text-muted-foreground",
          )}
        ></div>
      ))}
    </div>
  );
}
