export async function getRecords(habitId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/habits/${habitId}/records`,
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
