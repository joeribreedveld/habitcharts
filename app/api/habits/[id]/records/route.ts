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

  return new Response(JSON.stringify({ records: response }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
