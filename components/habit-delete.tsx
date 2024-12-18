"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { THabitDelete } from "@/lib/types/habit-types";
import { deleteHabit } from "@/lib/utils/habits/deleteHabit";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function HabitDelete({
  id,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: THabitDelete) {
  const [isPending, startTransition] = useTransition();

  const form = useForm();

  async function onSubmit() {
    startTransition(async () => {
      await deleteHabit(id);
    });
  }

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            habit.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:w-fit"
          >
            <AlertDialogAction type="submit" className="w-full">
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
