import { Record } from "@prisma/client";

export type THabitCalendar = {
  id: string;
  records: Record[];
  isCalendarDialogOpen: boolean;
  setIsCalendarDialogOpen: (value: boolean) => void;
  theme: string;
};

export type THabitChart = {
  target: number;
  chartData: TChartData[];
};

export type THabitDelete = {
  id: string;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
};

export type TRecord = {
  id: string;
  date: string;
  habitId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type THabit = {
  id: string;
  title: string;
  description: string;
  target: number;
  theme: string;
  records: Record[];
  createdAt?: string;
  updatedAt?: string;
};

export type TChartData = {
  date: string;
  week: number;
};

export type THabitEdit = {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
};

export type THabitTarget = {
  id: string;
  target: number;
  isTargetDialogOpen: boolean;
  setIsTargetDialogOpen: (value: boolean) => void;
};

export type THabitCreate = {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (value: boolean) => void;
};
