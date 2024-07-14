"use server";

import Habit from "@/components/habit";
import { THabit } from "@/lib/types/habit-types";
import { getHabits } from "@/lib/utils/habits/getHabits";
import { getRecords } from "@/lib/utils/habits/getRecords";
import { Record } from "@prisma/client";

export default async function Page() {
  const habits: THabit[] = await getHabits();

  return (
    <main className="px-4 sm:container py-12">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {habits &&
          habits.map(async (habit) => {
            const records: Record[] = await getRecords(habit.id);

            return (
              <Habit
                key={habit.id}
                id={habit.id}
                title={habit.title}
                description={habit.description}
                target={habit.target}
                theme={habit.theme}
                records={records}
              />
            );
          })}
      </div>
    </main>
  );
}
