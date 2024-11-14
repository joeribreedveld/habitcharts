import { PrismaClient } from "@prisma/client";
import { revalidateTag, unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  unstable_noStore();

  const id = (await params).id;

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
