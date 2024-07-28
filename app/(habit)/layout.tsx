import HabitHeader from "@/components/habit-header";

type TLayout = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: TLayout) {
  return (
    <>
      <HabitHeader />

      {children}
    </>
  );
}
