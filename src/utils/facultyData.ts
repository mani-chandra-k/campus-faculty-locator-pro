import { ClassSession, DayOfWeek, Faculty, Room, TimeSlot } from "./types";

// Define buildings and rooms
const BUILDINGS = ["BLOCK 1", "BLOCK 2", "BLOCK 3", "BLOCK 4"];
const DEPARTMENTS = ["AIML", "CSDS", "CSBS", "CSAI", "CSE", "ECE", "MECH", "IT"];
const SECTIONS = ["A", "B", "C"];

// Define time slots for classes (excluding lunch)
const MORNING_TIME_SLOTS: TimeSlot[] = [
  { startTime: "09:00", endTime: "09:55" },
  { startTime: "09:55", endTime: "10:50" },
  { startTime: "10:50", endTime: "11:45" }
];

const LUNCH_SLOT: TimeSlot = { startTime: "11:45", endTime: "12:40" };

const AFTERNOON_TIME_SLOTS: TimeSlot[] = [
  { startTime: "12:40", endTime: "13:35" },
  { startTime: "13:35", endTime: "14:30" },
  { startTime: "14:30", endTime: "15:25" }
];

const ALL_TIME_SLOTS = [...MORNING_TIME_SLOTS, LUNCH_SLOT, ...AFTERNOON_TIME_SLOTS];

// Helper function to generate a random room
const getRandomRoom = (): Room => {
  const building = BUILDINGS[Math.floor(Math.random() * BUILDINGS.length)];
  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  const section = SECTIONS[Math.floor(Math.random() * SECTIONS.length)];
  return { building, department, section };
};

// Helper function to create a lunch session
const createLunchSession = (): ClassSession => {
  return {
    room: { building: "CAFETERIA", department: "LUNCH AREA", section: "-" },
    timeSlot: LUNCH_SLOT,
    isLunch: true
  };
};

// Create a set to track used room-timeslot combinations to avoid conflicts
const usedRoomTimeSlots = new Set<string>();

// Helper function to generate a unique classroom session
const generateUniqueClassSession = (timeSlot: TimeSlot): ClassSession => {
  let room: Room;
  let key: string;
  
  // Keep generating rooms until we find an unused combination
  do {
    room = getRandomRoom();
    key = `${room.building}-${room.department}-${room.section}-${timeSlot.startTime}`;
  } while (usedRoomTimeSlots.has(key));
  
  // Mark this combination as used
  usedRoomTimeSlots.add(key);
  
  return {
    room,
    timeSlot,
    isLunch: false
  };
};

// Generate a complete day schedule for a faculty member
const generateDaySchedule = () => {
  const sessions: ClassSession[] = [];
  
  // Morning sessions
  for (const timeSlot of MORNING_TIME_SLOTS) {
    // 70% chance of having a class during this slot
    if (Math.random() < 0.7) {
      sessions.push(generateUniqueClassSession(timeSlot));
    }
  }
  
  // Lunch (always present)
  sessions.push(createLunchSession());
  
  // Afternoon sessions
  for (const timeSlot of AFTERNOON_TIME_SLOTS) {
    // 70% chance of having a class during this slot
    if (Math.random() < 0.7) {
      sessions.push(generateUniqueClassSession(timeSlot));
    }
  }
  
  return { sessions };
};

// Generate a complete weekly schedule
const generateWeeklySchedule = () => {
  return {
    [DayOfWeek.MONDAY]: generateDaySchedule(),
    [DayOfWeek.TUESDAY]: generateDaySchedule(),
    [DayOfWeek.WEDNESDAY]: generateDaySchedule(),
    [DayOfWeek.THURSDAY]: generateDaySchedule(),
    [DayOfWeek.FRIDAY]: generateDaySchedule(),
    [DayOfWeek.SATURDAY]: generateDaySchedule()
  };
};

// Generate faculty data
export const facultyData: Faculty[] = [
  { 
    id: "F001", 
    name: "Revathi",
    schedule: generateWeeklySchedule()
  },
  { 
    id: "F002", 
    name: "Shamila",
    schedule: generateWeeklySchedule()
  },
  { 
    id: "F003", 
    name: "Saritha",
    schedule: generateWeeklySchedule()
  },
  { 
    id: "F004", 
    name: "Nethrasri",
    schedule: generateWeeklySchedule()
  },
  { 
    id: "F005", 
    name: "Yesu",
    schedule: generateWeeklySchedule()
  },
  { 
    id: "F006", 
    name: "Rajini",
    schedule: generateWeeklySchedule()
  }
];

// Function to find faculty by name (case insensitive)
export const findFacultyByName = (name: string): Faculty | undefined => {
  return facultyData.find(faculty => 
    faculty.name.toLowerCase() === name.toLowerCase() ||
    faculty.id.toLowerCase() === name.toLowerCase()
  );
};

// Get all faculty names for dropdown
export const getAllFacultyNames = (): string[] => {
  return facultyData.map(faculty => faculty.name);
};

// Get current day name
export const getCurrentDayName = (): DayOfWeek => {
  const days = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY
  ];
  
  const today = new Date().getDay();
  // Convert from JS day (0=Sunday) to our enum (0=Monday)
  const dayIndex = today === 0 ? 5 : today - 1;
  
  return days[dayIndex < days.length ? dayIndex : 0];
};

// Get current time slot based on the current time
export const getCurrentTimeSlot = (): TimeSlot | null => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  
  for (const slot of ALL_TIME_SLOTS) {
    if (currentTime >= slot.startTime && currentTime < slot.endTime) {
      return slot;
    }
  }
  
  return null; // Outside of any time slot
};

// Find where a faculty is right now
export const findCurrentFacultyLocation = (faculty: Faculty): ClassSession | null => {
  const currentDay = getCurrentDayName();
  const currentTimeSlot = getCurrentTimeSlot();
  
  if (!currentTimeSlot) {
    return null; // Outside of school hours
  }
  
  const daySchedule = faculty.schedule[currentDay];
  
  for (const session of daySchedule.sessions) {
    if (
      session.timeSlot.startTime === currentTimeSlot.startTime &&
      session.timeSlot.endTime === currentTimeSlot.endTime
    ) {
      return session;
    }
  }
  
  return null; // No class this period
};
