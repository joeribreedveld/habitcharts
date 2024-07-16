import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

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

  revalidateTag(`records-${id}`);

  return new Response(JSON.stringify({ records: response }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
