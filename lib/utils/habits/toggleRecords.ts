"use server";

import { PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function toggleRecords(habitId: string, dates: Date[]) {
  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const promises = dates.map(async (date) => {
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
    } else {
      await prisma.record.create({
        data: {
          habitId,
          date,
        },
      });
    }
  });

  await Promise.all(promises);

  revalidateTag(`records-${habitId}`);

  return;
}
