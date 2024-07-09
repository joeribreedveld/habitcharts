import { TRecord } from "./habit";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const date = new Date();

  async function handleToggleRecord(day: Date | undefined) {
    if (day) {
      await toggleRecord(id, day.toISOString());
    }
  }

  //   selected if record is on the same day as the calendar day
  const recorded = records.map((record) => new Date(record.date));

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
