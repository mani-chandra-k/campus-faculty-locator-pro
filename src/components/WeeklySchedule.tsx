
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayOfWeek, Faculty } from "@/utils/types";
import DailySchedule from "./DailySchedule";
import { getCurrentDayName } from "@/utils/facultyData";

interface WeeklyScheduleProps {
  faculty: Faculty;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ faculty }) => {
  const currentDay = getCurrentDayName();

  return (
    <Card>
      <CardHeader className="bg-faculty-secondary text-white">
        <CardTitle>Weekly Schedule for {faculty.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={currentDay}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            {Object.values(DayOfWeek).map((day) => (
              <TabsTrigger key={day} value={day} className="capitalize">
                {day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.values(DayOfWeek).map((day) => (
            <TabsContent key={day} value={day}>
              <DailySchedule faculty={faculty} day={day} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;
