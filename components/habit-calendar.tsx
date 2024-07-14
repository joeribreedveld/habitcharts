"use client";

import { ThemeWrapper } from "@/components/theme-wrapper";
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
import { THabitCalendar } from "@/lib/types/habit-types";
import { cn } from "@/lib/utils";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { format, isSameDay } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function HabitCalendar({
  id,
  records,
  isCalendarDialogOpen,
  setIsCalendarDialogOpen,
  theme,
}: THabitCalendar) {
  const [loadingDates, setLoadingDates] = useState<Date[]>([]);

  const memoizedDates = useMemo(() => {
    return records.map((record) => new Date(record.date));
  }, [records]);

  const [recorded, setRecorded] = useState<Date[]>(memoizedDates);

  useEffect(() => {
    setRecorded(memoizedDates);
  }, [memoizedDates]);

  async function handleToggleRecord(day: Date) {
    const formattedDate = new Date(format(day, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));

    setRecorded((dates) => {
      if (dates.some((date) => isSameDay(date, formattedDate))) {
        return dates.filter((date) => !isSameDay(date, formattedDate));
      }

      return [...dates, formattedDate];
    });

    setLoadingDates((dates) => [...dates, formattedDate]);

    await toggleRecord(id, formattedDate);

    setLoadingDates((dates) =>
      dates.filter((date) => !isSameDay(date, formattedDate)),
    );
  }

  return (
    <Dialog open={isCalendarDialogOpen} onOpenChange={setIsCalendarDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendar</DialogTitle>
          <DialogDescription>
            Record your habit completion for a specific day
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex justify-center items-center w-full">
          <ThemeWrapper theme={theme}>
            <Calendar
              weekStartsOn={1}
              mode="single"
              onDayClick={(day) => handleToggleRecord(day)}
              className="w-full p-0 sm:border sm:shadow sm:rounded-md sm:p-3 sm:w-fit"
              modifiers={{
                recorded: (day) =>
                  recorded.some((record) => isSameDay(day, record)),
              }}
              classNames={{
                row: "flex w-full mt-2 justify-between sm:justify-center",
                day_today: "font-semibold",
                head_row:
                  "flex gap-2 sm:gap-4 justify-between sm:justify-center",
                day: "w-12 h-12 rounded-full font-normal aria-selected:opacity-100 transition-all",
              }}
              disabled={(day) => day > new Date()}
              components={{
                // Day: ({ ...props }) => {
                //   return (
                //     <button
                //       className="h-8 w-8 font-normal flex items-center justify-center gap-4"
                //       {...props}
                //     ></button>
                //   );
                // },
                DayContent: ({ ...props }) => {
                  return (
                    <div
                      className={cn(
                        "flex items-center justify-center m-1.5 rounded-full aspect-square hover:bg-muted",
                        recorded.some((date) => isSameDay(date, props.date)) &&
                          "bg-primary text-white hover:bg-primary/90",
                      )}
                    >
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
          </ThemeWrapper>
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
