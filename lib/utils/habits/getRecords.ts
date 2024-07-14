import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export async function getRecords(habitId: string) {
  const response = await fetch(
    `${getBaseUrl()}/api/habits/${habitId}/records`,
    {
      next: {
        tags: [`records-${habitId}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }

  const data = await response.json();

  return data.records;
}
