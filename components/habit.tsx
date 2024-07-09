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
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import {
  CircleAlert,
  CircleCheck,
  CircleHelp,
  LoaderCircle,
} from "lucide-react";
import { useState } from "react";

export type TRecord = {
  id: string;
  date: string;
  habitId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type THabit = {
  id: string;
  title: string;
  description: string;
  target: number;
  theme: string;
  records: TRecord[];
  createdAt?: string;
  updatedAt?: string;
};

export default function Habit({
  id,
  title,
  description,
  target,
  theme,
  records,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTargetDialogOpen, setIsTargetDialogOpen] = useState(false);

  const chartData = generateChartData(records);

  async function handleToggleRecord() {
    setIsLoading(true);

    await toggleRecord(id, new Date());

    setIsLoading(false);
  }

  const todayIsRecorded = records.some(
    (record: TRecord) =>
      new Date(record.date).toDateString() === new Date().toDateString(),
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0 flex-row justify-between gap-4 h-full w-full">
        <div className="space-y-1.5 w-full">
          <CardTitle className="line-clamp-1 break-all">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex h-fit items-center gap-2">
          <HabitTarget
            id={id}
            target={target}
            isTargetDialogOpen={isTargetDialogOpen}
            setIsTargetDialogOpen={setIsTargetDialogOpen}
          />

          <HabitActions
            id={id}
            title={title}
            description={description}
            target={target}
            theme={theme}
            records={records}
          />
        </div>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="aspect-video border-dashed border rounded-md flex items-center justify-center">
            <p className="text-center text-muted-foreground text-sm flex items-center">
              <CircleHelp className="h-4 w-4 text-muted-foreground mr-2" />
              No records found
            </p>
          </div>
        ) : (
          <ThemeWrapper theme={theme}>
            <HabitChart target={target} chartData={chartData} />
          </ThemeWrapper>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant={todayIsRecorded ? "secondary" : "outline"}
          size="lg"
          className="mt-2 w-full text-xs"
          onClick={() => handleToggleRecord()}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
          ) : todayIsRecorded ? (
            <CircleCheck className="h-4 w-4 mr-2" />
          ) : (
            <CircleAlert className="h-4 w-4 mr-2" />
          )}
          {todayIsRecorded ? "Completed" : "Todo"}
        </Button>
      </CardFooter>
    </Card>
  );
}
