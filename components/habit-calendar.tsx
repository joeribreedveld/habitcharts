"use client";

import { TRecord } from "@/components/habit";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { isSameDay } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

type THabitCalendar = {
  id: string;
  records: TRecord[];
  isCalendarDialogOpen: boolean;
  setIsCalendarDialogOpen: (value: boolean) => void;
};

export function HabitCalendar({
  id,
  records,
  isCalendarDialogOpen,
  setIsCalendarDialogOpen,
}: THabitCalendar) {
  const [loadingDates, setLoadingDates] = useState<Date[]>([]);
  const [recorded, setRecorded] = useState<Date[]>(
    records.map((record) => new Date(record.date)),
  );

  async function handleToggleRecord(day: Date | undefined) {
    if (day) {
      setRecorded((dates) => {
        if (dates.some((date) => isSameDay(date, day))) {
          return dates.filter((date) => !isSameDay(date, day));
        }

        return [...dates, day];
      });

      setLoadingDates((dates) => [...dates, day]);

      await toggleRecord(id, day.toDateString());

      setLoadingDates((dates) => dates.filter((date) => !isSameDay(date, day)));
    }
  }

  return (
    <Dialog open={isCalendarDialogOpen} onOpenChange={setIsCalendarDialogOpen}>
      <DialogContent className="max-w-min">
        <DialogHeader>
          <DialogTitle>Calendar</DialogTitle>
          <DialogDescription>
            Record your habit completion for a specific day
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 w-fit">
          <Calendar
            weekStartsOn={1}
            mode="single"
            onDayClick={(day) => handleToggleRecord(day)}
            className="rounded-md border shadow w-fit"
            modifiers={{
              recorded: (day) =>
                recorded.some((record) => isSameDay(day, record)),
            }}
            modifiersClassNames={{
              recorded: "bg-muted border",
            }}
            classNames={{
              row: "flex w-full mt-2 gap-2",
              day_today: "font-bold",
              head_row: "flex gap-2",
            }}
            components={{
              DayContent: ({ ...props }) => {
                return (
                  <div className="flex items-center justify-center h-8 w-8">
                    {loadingDates.some((date) =>
                      isSameDay(date, props.date),
                    ) ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      props.date.getDate()
                    )}
                  </div>
                );
              },
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon className="h-4 w-4" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon className="h-4 w-4" />
              ),
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
