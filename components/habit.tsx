import HabitToggle from "./habit-toggle";
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
import { TChartData, THabit } from "@/lib/types/habit-types";
import { generateChartData } from "@/lib/utils/charts/generateChartData";
import { getRecords } from "@/lib/utils/habits/getRecords";
import { toggleRecord } from "@/lib/utils/habits/toggleRecord";
import { Record } from "@prisma/client";
import { format, isSameDay } from "date-fns";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export default async function Habit({
  id,
  title,
  description,
  target,
  theme,
}: THabit) {
  const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const records: Record[] = await getRecords(id);

  const isRecorded = records.some((record: Record) => {
    const recordDate = record.date;

    return isSameDay(recordDate, new Date(date));
  });

  const chartData = generateChartData(records, date);

  return (
    <Card className="flex flex-col shadow-sm">
      <CardHeader className="space-y-0 flex-row justify-between gap-4 h-full w-full">
        <div className="space-y-1.5 w-full">
          <CardTitle className="line-clamp-1 break-all">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex h-fit items-center gap-2">
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
        <Suspense fallback={<p>Loading...</p>}>
          <ThemeWrapper theme={theme}>
            <HabitChart target={target} chartData={chartData} />
          </ThemeWrapper>
        </Suspense>
        {/* {records.length === 0 ? (
          <div className="aspect-video border-dashed border rounded-md flex items-center justify-center">
            <p className="text-center text-muted-foreground text-xs">
              No records found
            </p>
          </div>
        ) : (
       
        )} */}
      </CardContent>

      <CardFooter>
        <Suspense fallback={<p>Loading...</p>}>
          <HabitToggle isRecorded={isRecorded} id={id} date={date} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
