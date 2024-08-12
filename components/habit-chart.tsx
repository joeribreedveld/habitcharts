"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TChartData, THabitChart } from "@/lib/types/habit-types";
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from "recharts";

const chartConfig: ChartConfig = {};

export default function HabitChart({ target, chartData }: THabitChart) {
  const maxValue = Math.max(
    ...chartData.map((entry: TChartData) => entry.week),
  );
  const yAxisTicks = Array.from({ length: maxValue + 1 }, (_, i) => i);

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
        />

        {yAxisTicks.map((tick) => (
          <ReferenceLine key={tick} y={tick} className="opacity-50" />
        ))}

        <ReferenceLine
          y={target}
          className="[&_.recharts-reference-line-line]:stroke-primary/50"
        />

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
  );
}
