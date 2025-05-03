
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayOfWeek, Faculty } from "@/utils/types";
import DailySchedule from "./DailySchedule";
import { getCurrentDayName } from "@/utils/facultyData";
import { Calendar } from "lucide-react";

interface WeeklyScheduleProps {
  faculty: Faculty;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ faculty }) => {
  const currentDay = getCurrentDayName();

  return (
    <Card className="shadow-lg border border-faculty-accent/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white">
        <CardTitle className="flex items-center justify-center">
          <Calendar size={24} className="mr-2" />
          <span>Weekly Schedule for {faculty.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={currentDay}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6 bg-faculty-secondary/10">
            {Object.values(DayOfWeek).map((day) => (
              <TabsTrigger 
                key={day} 
                value={day} 
                className={`capitalize text-faculty-primary data-[state=active]:bg-faculty-accent data-[state=active]:text-white`}
              >
                {day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.values(DayOfWeek).map((day) => (
            <TabsContent key={day} value={day} className="animate-fade-in">
              <DailySchedule faculty={faculty} day={day} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;
