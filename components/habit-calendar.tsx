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
import { Form } from "@/components/ui/form";
import { THabitCalendar } from "@/lib/types/habit-types";
import { cn } from "@/lib/utils";
import { toggleRecords } from "@/lib/utils/habits/toggleRecords";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { format, isSameDay, set } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({});

export function HabitCalendar({
  id,
  records,
  isCalendarDialogOpen,
  setIsCalendarDialogOpen,
  theme,
}: THabitCalendar) {
  const [queuedDates, setQueuedDates] = useState<Date[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const memoizedDates = useMemo(() => {
    return records.map((record) => new Date(record.date));
  }, [records]);

  const [recorded, setRecorded] = useState<Date[]>(memoizedDates);

  useEffect(() => {
    setRecorded(memoizedDates);
  }, [memoizedDates]);

  async function handleQueueDate(day: Date) {
    const formattedDate = new Date(format(day, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));

    setQueuedDates((dates) => {
      if (dates.some((date) => isSameDay(date, formattedDate))) {
        return dates.filter((date) => !isSameDay(date, formattedDate));
      }

      return [...dates, formattedDate];
    });

    setRecorded((dates) => {
      if (dates.some((date) => isSameDay(date, formattedDate))) {
        return dates.filter((date) => !isSameDay(date, formattedDate));
      }

      return [...dates, formattedDate];
    });
  }

  async function onSubmit() {
    startTransition(async () => {
      await toggleRecords(id, queuedDates);
    });
  }

  useEffect(() => {
    if (!isPending) {
      setIsCalendarDialogOpen(false);

      setQueuedDates([]);
    }
  }, [isPending, setIsCalendarDialogOpen]);

  return (
    <Dialog open={isCalendarDialogOpen} onOpenChange={setIsCalendarDialogOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  onDayClick={(day) => handleQueueDate(day)}
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
                    DayContent: ({ ...props }) => {
                      return (
                        <div
                          className={cn(
                            "flex items-center justify-center m-1.5 rounded-full aspect-square hover:bg-muted",
                            recorded.some((date) =>
                              isSameDay(date, props.date),
                            ) && "bg-primary text-white hover:bg-primary/90",
                          )}
                        >
                          {props.date.getDate()}
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
            <DialogFooter className="mt-8 gap-2 sm:justify-between">
              <DialogClose asChild>
                <Button
                  type="reset"
                  variant="ghost"
                  onMouseDown={() => {
                    setQueuedDates([]);
                    setRecorded(memoizedDates);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
