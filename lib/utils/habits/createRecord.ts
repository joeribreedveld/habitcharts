"use server";

import { PrismaClient } from "@prisma/client";
import { startOfDay, endOfDay } from "date-fns";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createRecord(habitId: string, date: string) {
  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const startDate = startOfDay(new Date(date));
  const endDate = endOfDay(new Date(date));

  const record = await prisma.record.findFirst({
    where: {
      habitId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (record) {
    throw new Error("Record already exists");
  }

  const response = await prisma.record.create({
    data: {
      habitId,
      date: startDate, // Save the start of the day to keep it consistent
    },
  });

  console.log(response);

  revalidatePath("/");
}
