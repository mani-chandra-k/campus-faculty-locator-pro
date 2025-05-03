
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassSession, DayOfWeek, Faculty } from "@/utils/types";
import { findCurrentFacultyLocation } from "@/utils/facultyData";
import { Clock, MapPin } from "lucide-react";

interface DailyScheduleProps {
  faculty: Faculty;
  day: DayOfWeek;
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ faculty, day }) => {
  const daySchedule = faculty.schedule[day];
  const sessions = [...daySchedule.sessions].sort((a, b) => 
    a.timeSlot.startTime.localeCompare(b.timeSlot.startTime)
  );

  // Check if any session is current
  const currentLocation = findCurrentFacultyLocation(faculty);

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const getDayTitle = (day: DayOfWeek): string => {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  };

  const isCurrentSession = (session: ClassSession): boolean => {
    if (!currentLocation) return false;
    
    return (
      session.timeSlot.startTime === currentLocation.timeSlot.startTime &&
      session.room.building === currentLocation.room.building &&
      session.room.department === currentLocation.room.department &&
      session.room.section === currentLocation.room.section
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader className="bg-faculty-primary text-white">
        <CardTitle className="flex justify-between items-center">
          <span>{getDayTitle(day)}'s Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {sessions.length === 0 ? (
          <p className="text-center text-gray-500">No scheduled sessions for this day.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-md border ${isCurrentSession(session) ? 'border-faculty-accent bg-green-50' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-faculty-secondary mr-2" />
                      <span className="font-medium">
                        {formatTimeSlot(session.timeSlot.startTime)} - {formatTimeSlot(session.timeSlot.endTime)}
                      </span>
                      {isCurrentSession(session) && (
                        <Badge className="ml-2 bg-faculty-accent">Current Location</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <MapPin size={16} className="text-faculty-secondary mr-2" />
                      <span className="font-medium">
                        {session.isLunch ? (
                          "Cafeteria - Lunch Break"
                        ) : (
                          <>
                            {session.room.building} - {session.room.department} Section {session.room.section}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <Badge className={session.isLunch ? "bg-yellow-500" : "bg-faculty-primary"}>
                    {session.isLunch ? "Lunch" : "Class"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
