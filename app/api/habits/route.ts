import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  unstable_noStore();

  const response = await prisma.habit.findMany();

  if (!response) {
    throw new Error("Failed to fetch habits");
  }

  return new Response(JSON.stringify({ habits: response }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
