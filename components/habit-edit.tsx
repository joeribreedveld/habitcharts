"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THabit, THabitEdit } from "@/lib/types/habit-types";
import { updateHabit } from "@/lib/utils/habits/updateHabit";
import themes from "@/public/themes.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(50),
  target: z.string(),
  theme: z.string(),
});

export default function HabitEdit({
  id,
  title,
  description,
  target,
  theme,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: THabitEdit & THabit) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      target: target.toString(),
      theme,
    },
  });

  useEffect(() => {
    form.reset({
      title,
      description,
      target: target.toString(),
      theme,
    });
  }, [form, target]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await updateHabit(
        id,
        parseInt(values.target),
        values.title,
        values.description,
        values.theme,
      );
    });
  }

  useEffect(() => {
    if (!isPending) {
      setIsEditDialogOpen(false);
    }
  }, [isPending, setIsEditDialogOpen]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit habit</DialogTitle>
              <DialogDescription>
                Fill in the details below to edit this habit.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Target"
                        max={7}
                        min={1}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themes.map((theme, index) => (
                            <SelectItem key={index} value={theme.name}>
                              <div className="flex items-center gap-2 capitalize">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ background: theme.color }}
                                />
                                {theme.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4 gap-2 sm:justify-between">
              <DialogClose asChild>
                <Button type="reset" variant="ghost">
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
