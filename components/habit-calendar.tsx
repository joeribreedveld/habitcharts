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

const FormSchema = z.object({
  day: z.date(),
});

export function HabitCalendar({
  id,
  records,
  isCalendarDialogOpen,
  setIsCalendarDialogOpen,
}: THabitCalendar) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const day = form.watch("day");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

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
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Calendar</DialogTitle>
              <DialogDescription>
                Record your habit completion for a specific day
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                              //   iif this date is recorded
                              //   add a class to the button
                              records.some((record) =>
                                isSameDay(new Date(record.date), field.value),
                              ) && "bg-muted",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          classNames={{
                            day_today:
                              "bg-muted-foreground text-white hover:bg-primary hover:text-white",
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          modifiers={{
                            recorded: (date) =>
                              recorded.some(
                                (record) =>
                                  record.toDateString() === date.toDateString(),
                              ),
                          }}
                          modifiersClassNames={{
                            recorded: "bg-accent",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                className="w-fit"
                onClick={() => handleToggleRecord(day)}
              >
                Toggle
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
