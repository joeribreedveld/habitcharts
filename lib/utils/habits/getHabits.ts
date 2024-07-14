export async function getHabits() {
  const response = await fetch("https://habitcharts.vercel.app/api/habits", {
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
