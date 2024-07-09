"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateHabit(
  id: string,
  target: number,
  title?: string,
  description?: string,
  theme?: string,
) {
  const habit = await prisma.habit.findUnique({
    where: {
      id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const response = await prisma.habit.update({
    where: {
      id,
    },

    data: {
      title,
      description,
      target,
      theme,
    },
  });

  revalidatePath("/");

  return response;
}
