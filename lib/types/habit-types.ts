export type THabitCalendar = {
  id: string;
  records: TRecord[];
  isCalendarDialogOpen: boolean;
  setIsCalendarDialogOpen: (value: boolean) => void;
};

export type THabitChart = {
  target: number;
  chartData: TChartData[];
};

export type THabitDelete = {
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
  records: TRecord[];
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
