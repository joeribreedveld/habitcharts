"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getAllHabits() {
  const response = await prisma.habit.findMany({
    include: {
      records: true,
    },
  });

  console.log(response);

  revalidatePath("/");

  return response;
}
