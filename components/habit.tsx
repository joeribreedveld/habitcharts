"use client";

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
import { generateChartData } from "@/lib/utils";
import { createRecord } from "@/lib/utils/habits/createRecord";
import { CircleAlert } from "lucide-react";

export type THabit = {
  id: string;
  title: string;
  description: string;
  target: number;
  theme: string;
};

export default function Habit({
  id,
  title,
  description,
  target,
  theme,
  records,
}: any) {
  const chartData = generateChartData(records);

  function handleCheck() {
    createRecord(id, new Date().toISOString());
  }

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
            id={id}
            title={title}
            description={description}
            target={target}
            theme={theme}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ThemeWrapper theme={theme}>
          <HabitChart target={target} chartData={chartData} />
        </ThemeWrapper>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="lg"
          className="mt-2 w-full text-xs"
          onClick={() => handleCheck()}
        >
          <CircleAlert className="mr-2 h-4 w-4" />
          Todo
        </Button>
      </CardFooter>
    </Card>
  );
}
