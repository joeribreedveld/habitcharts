"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function createHabit(
  title: string,
  description: string,
  target: number,
  theme: string,
) {
  const response = await prisma.habit.create({
    data: {
      title,
      description,
      target,
      theme,
    },
  });

  revalidateTag("habits");

  return response;
}
