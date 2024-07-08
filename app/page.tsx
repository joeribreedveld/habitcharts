import Habit from "@/components/habit";

export default function Page() {
  return (
    <main className="px-4 sm:container py-16">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Habit theme="red" title="Title" description="Description" target={5} />
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
        />
      </div>
    </main>
  );
}
