"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteHabit(id: string) {
  await prisma.record.deleteMany({
    where: {
      habitId: id,
    },
  });

  await prisma.habit.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");

  return;
}
