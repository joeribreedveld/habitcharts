import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HabitSkeleton() {
  return (
    <Card className="flex flex-col shadow-none border-none">
      <CardHeader className="space-y-0 flex-row justify-between gap-4 h-full w-full">
        <Skeleton className="h-[42px] w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full aspect-video pb-4 px-4" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full mt-2" />
      </CardFooter>
    </Card>
  );
}
