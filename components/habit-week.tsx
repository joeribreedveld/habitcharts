"use client";

import { THabitWeek } from "@/lib/types/habit-types";
import { cn } from "@/lib/utils";
import { isSameDay, startOfWeek } from "date-fns";
import { useEffect, useMemo, useState } from "react";

// show 7 gray blocks and i f the blocks are used make them primary

export default function HabitWeek({ target, records }: THabitWeek) {
  const memoizedRecords = useMemo(() => {
    return records.map((record) => new Date(record.date));
  }, [records]);

  //   7 days starting from first day of current week
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek(new Date());
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
    <div>
      <div className="flex justify-between gap-2">
        {dates.map((date) => (
          <div
            key={date.toISOString()}
            className={cn(
              "w-full aspect-square rounded-md text-white text-sm flex items-center justify-center",
              memoizedRecords.some((record) => isSameDay(record, date))
                ? "bg-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-2 text-xs text-muted-foreground mt-2.5">
        <p className="w-full flex items-center justify-center">Mo</p>
        <p className="w-full flex items-center justify-center">Tu</p>
        <p className="w-full flex items-center justify-center">We</p>
        <p className="w-full flex items-center justify-center">Th</p>
        <p className="w-full flex items-center justify-center">Fr</p>
        <p className="w-full flex items-center justify-center">Sa</p>
        <p className="w-full flex items-center justify-center">Su</p>
      </div>
    </div>
  );
}
