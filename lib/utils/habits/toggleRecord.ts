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

  // i want to get the start and end of the server date so if "2024-07-09T22:00:00.000Z" is the server date in utc i want to get between "2024-07-09T22:00:00.000Z" and "2024-07-10T22:00:00.000Z" but it keeps doing "2024-07-09T00:00:00.000Z 2024-07-09T23:59:59.999Z" from the utc converted date
  // in utc
  // date =  2024-07-09T22:00:00.000Z
  // i want returned:
  // startdate:  2024-07-09T22:00:00.000Z
  // enddate: 2024-07-10T22:00:00.000Z

  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

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

  return response;
}
