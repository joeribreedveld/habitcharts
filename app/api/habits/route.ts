import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const response = await prisma.habit.findMany();

  return Response.json({ habits: response });
}
