import Habit from "@/components/habit";
import { createHabit } from "@/lib/utils/habits/createHabit";
import { createRecord } from "@/lib/utils/habits/createRecord";
import { getAllHabits } from "@/lib/utils/habits/getAllHabits";

export default async function Page() {
  const habits = await getAllHabits();

  return (
    <main className="px-4 sm:container py-16">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            id={habit.id}
            title={habit.title}
            records={habit.records}
            description={habit.description}
            target={habit.target}
            theme={habit.theme}
          />
        ))}
        {/* <Habit theme="red" title="Title" description="Description" target={5} />
        <Habit
          theme="orange"
          title="Title"
          description="Description"
          target={5}
        />
        <Habit
          theme="green"
          title="Title"
          description="Description"
          target={5}
        />
        <Habit
          theme="blue"
          title="Title"
          description="Description"
          target={5}
        />
        <Habit
          theme="yellow"
          title="Title"
          description="Description"
          target={5}
        />
        <Habit
          theme="violet"
          title="Title"
          description="Description"
          target={5}
        /> */}
      </div>
    </main>
  );
}
