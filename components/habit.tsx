import HabitChart from "@/components/habit-chart";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

type THabit = {
  title: string;
  description: string;
  target: number;
  theme: string;
};

export default function Habit({ title, description, target, theme }: THabit) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ThemeWrapper theme={theme}>
          <HabitChart target={target} />
        </ThemeWrapper>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="lg" className="mt-2 w-full text-xs">
          <CircleCheck className="mr-2 h-4 w-4" />
          Todo
        </Button>
      </CardFooter>
    </Card>
  );
}
