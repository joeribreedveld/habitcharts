import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const response = await prisma.habit.findMany();

  if (!response) {
    return new Response(JSON.stringify({ habits: [] }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ habits: response }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
