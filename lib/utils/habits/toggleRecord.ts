"use server";

import { PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function toggleRecord(habitId: string, date: Date) {
  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const startDate = startOfDay(new Date(date)).toISOString();
  const endDate = endOfDay(new Date(date)).toISOString();

  console.log("Server Date", date);

  console.log("Server", startDate, endDate);

  const record = await prisma.record.findFirst({
    where: {
      habitId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  if (record) {
    await prisma.record.delete({
      where: {
        id: record.id,
      },
    });

    revalidatePath("/");

    return;
  }

  if (date > new Date()) {
    throw new Error("Cannot record future dates");
  }

  const response = await prisma.record.create({
    data: {
      habitId,
      date: date,
    },
  });

  revalidatePath("/");

  return;
}
