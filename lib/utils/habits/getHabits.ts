import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export async function getHabits() {
  const response = await fetch(`${getBaseUrl()}/api/habits`, {
    next: {
      tags: ["habits"],
    },
  });

  console.log("test", response);

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }

  const data = await response.json();

  return data.habits;
}
