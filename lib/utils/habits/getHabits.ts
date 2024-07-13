export async function getHabits() {
  const response = await fetch("http://localhost:3000/api/habits", {
    next: {
      tags: ["habits"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }

  const data = await response.json();

  return data.habits;
}
