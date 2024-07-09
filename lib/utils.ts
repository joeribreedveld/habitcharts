import { type ClassValue, clsx } from "clsx";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  isWithinInterval,
  format,
  addDays,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateData() {
  return [
    {
      week: Math.floor(Math.random() * 7),
      date: "13/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "20/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "27/5",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "3/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "10/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "17/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "24/6",
    },
    {
      week: Math.floor(Math.random() * 7),

      date: "1/7",
    },
  ];
}

export function generateChartData(records: any) {
  const data = Array.from({ length: 8 }, (_, i) => {
    const currentDate = new Date();

    const weekStart = startOfWeek(subWeeks(currentDate, i), {
      weekStartsOn: 1,
    });
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    return {
      week: records.filter((record: any) => {
        const recordDate = new Date(record.date);

        return isWithinInterval(recordDate, { start: weekStart, end: weekEnd });
      }).length,
      date: format(weekStart, "d/M"),
    };
  });

  return data.reverse();
}
