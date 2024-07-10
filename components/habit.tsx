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
import { TChartData, THabit, TRecord } from "@/lib/types/habit-types";
import { generateChartData } from "@/lib/utils";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { Record } from "@prisma/client";
import { format, isSameDay } from "date-fns";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function Habit({
  id,
  title,
  description,
  target,
  theme,
  records,
}: THabit) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTargetDialogOpen, setIsTargetDialogOpen] = useState(false);

  const chartData: TChartData[] = generateChartData(records);

  const date = new Date(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));

  async function handleToggleRecord() {
    setIsLoading(true);

    await toggleRecord(id, date);

    setIsLoading(false);
  }

  const todayIsRecorded = records.some((record: Record) => {
    return isSameDay(new Date(record.date), date);
  });

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
            <p className="text-center text-muted-foreground text-xs">
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
