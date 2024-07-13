import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const response = await prisma.record.findMany({
    where: {
      habitId: id,
    },
  });

  return Response.json({ records: response });
}
