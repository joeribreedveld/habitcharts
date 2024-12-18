"use server";

import { PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { revalidateTag } from "next/cache";

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

  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

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

    revalidateTag(`records-${habitId}`);

    return;
  }

  const response = await prisma.record.create({
    data: {
      habitId,
      date,
    },
  });

  revalidateTag(`records-${habitId}`);

  return response;
}
