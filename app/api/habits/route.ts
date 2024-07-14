import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const response = await prisma.habit.findMany();

  console.log(response);

  return Response.json({ habits: response });
}
