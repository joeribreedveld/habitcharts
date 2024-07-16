import { PrismaClient } from "@prisma/client";
import { revalidateTag, unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  unstable_noStore();

  const response = await prisma.habit.findMany();

  if (!response) {
    throw new Error("Failed to fetch habits");
  }

  revalidateTag("habits");

  console.log(response);

  return new Response(JSON.stringify({ habits: response }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
