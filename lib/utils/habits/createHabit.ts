"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");
}
