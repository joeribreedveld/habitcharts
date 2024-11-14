import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Record } from "@prisma/client";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  isWithinInterval,
  format,
} from "date-fns";

export function generateChartData(records: Record[], date: string) {
  const data = Array.from({ length: 8 }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(date, i), {
      weekStartsOn: 1,
    });
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    return {
      week: records.filter((record: Record) => {
        const recordDate = new Date(record.date);

        return isWithinInterval(recordDate, { start: weekStart, end: weekEnd });
      }).length,
      date: format(weekStart, "d/M"),
    };
  });

  return data.reverse();
}
