"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { THabitTarget } from "@/lib/types/habit-types";
import { updateHabit } from "@/lib/utils/habits/updateHabit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Crosshair, LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  target: z.string(),
});

export default function HabitTarget({
  id,
  target,
  isTargetDialogOpen,
  setIsTargetDialogOpen,
}: THabitTarget) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: target.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await updateHabit(id, parseInt(values.target));
    });
  }

  useEffect(() => {
    if (!isPending) {
      setIsTargetDialogOpen(false);
    }
  }, [isPending, setIsTargetDialogOpen]);

  return (
    <Dialog open={isTargetDialogOpen} onOpenChange={setIsTargetDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Crosshair className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Set target</DialogTitle>
              <DialogDescription>
                Fill in the details below to set a target for this habit.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input type="number" max={7} min={1} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4">
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
