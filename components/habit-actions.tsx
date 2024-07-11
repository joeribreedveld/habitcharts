"use client";

import { HabitCalendar } from "@/components/habit-calendar";
import HabitDelete from "@/components/habit-delete";
import HabitEdit from "@/components/habit-edit";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THabit } from "@/lib/types/habit-types";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export default function HabitActions({
  id,
  title,
  description,
  target,
  theme,
  records,
}: THabit) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);

  return (
    <>
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
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
