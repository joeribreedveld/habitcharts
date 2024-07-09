"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from "recharts";

type THabitChart = {
  target: number;
  chartData: any;
};

const chartConfig: ChartConfig = {};

export default function HabitChart({ target, chartData }: THabitChart) {
  return (
    <ChartContainer config={chartConfig} className="aspect-video">
      <BarChart data={chartData} barCategoryGap="12.5%">
        <Bar dataKey="week" radius={[4, 4, 0, 0]}>
          {chartData.map((entry: any, index: number) => (
            <Cell
              key={index}
              fontSize={12}
              className="fill-primary"
              opacity={entry.week < target ? 0.5 : 1}
            />
          ))}
        </Bar>
        <XAxis dataKey="date" tickLine={false} axisLine={false} height={16} />

        <ReferenceLine y={target} />
        <YAxis
          orientation="right"
          domain={[0, target]}
          ticks={[0, target]}
          axisLine={false}
          tickLine={false}
          width={16}
        />
      </BarChart>
    </ChartContainer>
  );
}
