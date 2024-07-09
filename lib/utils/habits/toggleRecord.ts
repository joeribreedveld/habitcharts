"use server";

import { PrismaClient } from "@prisma/client";
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

  const record = await prisma.record.findFirst({
    where: {
      habitId,
      date: {
        gte: new Date(date).toISOString(),
        lt: new Date(date).toISOString(),
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

  if (new Date(date) > new Date()) {
    throw new Error("Cannot record for future dates");
  }

  const response = await prisma.record.create({
    data: {
      habitId,
      date: new Date(date).toISOString(),
    },
  });

  console.log(response);

  revalidatePath("/");

  return;
}
