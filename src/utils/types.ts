
export interface Room {
  building: string; // BLOCK 1, BLOCK 2, etc.
  department: string; // AIML, CSDS, etc.
  section: string; // A, B, C
}

export interface TimeSlot {
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface ClassSession {
  room: Room;
  timeSlot: TimeSlot;
  isLunch: boolean;
}

export interface DaySchedule {
  sessions: ClassSession[];
}

export type WeekSchedule = {
  [key in DayOfWeek]: DaySchedule;
};

export interface Faculty {
  id: string;
  name: string;
  schedule: WeekSchedule;
}

export enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday"
}

export interface Holiday {
  day: number;
  month: number;
  description: string;
}

// Blog related interfaces
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  category: string;
  tags: string[];
  image?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: Date;
}
