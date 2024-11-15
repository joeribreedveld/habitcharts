"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { TChartData, THabitChart, TRecord } from "@/lib/types/habit-types";
import { cn } from "@/lib/utils";
import {
  addDays,
  addWeeks,
  differenceInCalendarDays,
  endOfWeek,
  getDay,
  getISOWeek,
  isSameDay,
  isWithinInterval,
  parse,
  parseISO,
  startOfWeek,
} from "date-fns";
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from "recharts";

const chartConfig: ChartConfig = {};

export default function HabitChart({ target, chartData }: THabitChart) {
  const maxValue = Math.max(
    ...chartData.map((entry: TChartData) => entry.week),
  );
  const yAxisTicks = Array.from({ length: maxValue + 1 }, (_, i) => i);

  const isMobile = useIsMobile();

  if (isMobile && chartData.length > 7) {
    chartData = chartData.slice(chartData.length - 7);
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-video text-primary">
      <BarChart data={chartData} barCategoryGap="20%">
        <Bar dataKey="week" radius={[4, 4, 0, 0]}>
          {chartData.map((entry: TChartData, index: number) => (
            <Cell
              key={index}
              fontSize={12}
              className="fill-primary"
              opacity={entry.week < target ? 0.5 : 1}
            />
          ))}
        </Bar>

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          height={24}
          tickMargin={8}
          interval="preserveStartEnd"
          className="[&_.recharts-cartesian-axis-tick_text]:text-xs"
        />

        {yAxisTicks.map((tick) => (
          <ReferenceLine
            key={tick}
            y={tick}
            stroke="#fff"
            className="opacity-50"
          />
        ))}

        <ReferenceLine y={target} className="opacity-50" />

        <YAxis
          orientation="right"
          domain={[0, target]}
          ticks={[0, target]}
          axisLine={false}
          tickLine={false}
          width={16}
          className="[&_.recharts-cartesian-axis-tick:last-child_text]:fill-primary [&_.recharts-cartesian-axis-tick:last-child_text]:font-medium"
        />
      </BarChart>
    </ChartContainer>
    // <div className="w-full h-14 rounded-lg flex gap-4">
    //   {Array.from({ length: 7 }).map((_, index) => (
    //     <div className="w-full flex flex-col gap-2 h-full" key={index}>
    //       <div
    //         key={index}
    //         className={cn(
    //           "w-full h-full bg-muted rounded-md",
    //           // make background primary if the current day is completed
    //         )}
    //       ></div>
    //       <p className="text-xs text-center text-muted-foreground">
    //         {index == 0
    //           ? "Mo"
    //           : index == 1
    //             ? "Tu"
    //             : index == 2
    //               ? "We"
    //               : index == 3
    //                 ? "Th"
    //                 : index == 4
    //                   ? "Fr"
    //                   : index == 5
    //                     ? "Sa"
    //                     : "Su"}
    //       </p>
    //     </div>
    //   ))}
    // </div>
  );
}
