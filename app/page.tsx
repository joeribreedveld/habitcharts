"use server";

import Habit from "@/components/habit";
import { Skeleton } from "@/components/ui/skeleton";
import { THabit } from "@/lib/types/habit-types";
import { getHabits } from "@/lib/utils/habits/getHabits";
import { Suspense } from "react";

export default async function Page() {
  const habits: THabit[] = await getHabits();

  return (
    <main className="px-4 sm:container py-12">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Suspense
          fallback={
            <>
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
            </>
          }
        >
          {habits.map(async (habit) => {
            // const records: Record[] = await getRecords(habit.id);
            // records under slow timeout wait 10 seconds before fetching

            return (
              <Habit
                key={habit.id}
                id={habit.id}
                title={habit.title}
                description={habit.description}
                target={habit.target}
                theme={habit.theme}
              />
            );
          })}
        </Suspense>
      </div>
    </main>
  );
}
