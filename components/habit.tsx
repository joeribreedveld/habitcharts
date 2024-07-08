import HabitActions from "@/components/habit-actions";
import HabitChart from "@/components/habit-chart";
import HabitTarget from "@/components/habit-target";
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
import { CircleAlert } from "lucide-react";

export type THabit = {
  title: string;
  description: string;
  target: number;
  theme: string;
};

export default function Habit({ title, description, target, theme }: THabit) {
  return (
    <Card>
      <CardHeader className="space-y-0 flex-row justify-between">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex h-fit items-center gap-2">
          <HabitTarget target={target} />

          <HabitActions
            title={title}
            description={description}
            target={target}
            theme={theme}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ThemeWrapper theme={theme}>
          <HabitChart target={target} />
        </ThemeWrapper>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="lg" className="mt-2 w-full text-xs">
          <CircleAlert className="mr-2 h-4 w-4" />
          Todo
        </Button>
      </CardFooter>
    </Card>
  );
}
