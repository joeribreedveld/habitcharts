"use client";

import { HabitCalendar } from "@/components/habit-calendar";
import HabitDelete from "@/components/habit-delete";
import HabitEdit from "@/components/habit-edit";
import HabitTarget from "@/components/habit-target";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THabitActions } from "@/lib/types/habit-types";
import { BarChartBig, Ellipsis, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function HabitActions({
  id,
  title,
  description,
  target,
  theme,
  records,
}: THabitActions) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);
  const [isTargetDialogOpen, setIsTargetDialogOpen] = useState(false);

  return (
    <>
      {/* <HabitTarget
        id={id}
        target={target}
        isTargetDialogOpen={isTargetDialogOpen}
        setIsTargetDialogOpen={setIsTargetDialogOpen}
      /> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsCalendarDialogOpen(true)}>
              Calendar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <HabitCalendar
        id={id}
        theme={theme}
        records={records}
        isCalendarDialogOpen={isCalendarDialogOpen}
        setIsCalendarDialogOpen={setIsCalendarDialogOpen}
      />

      <HabitEdit
        id={id}
        title={title}
        description={description}
        target={target}
        theme={theme}
        records={records}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />

      <HabitDelete
        id={id}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
