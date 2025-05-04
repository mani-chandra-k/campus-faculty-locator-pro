
import React from "react";
import { Faculty } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, School, BookOpen } from "lucide-react";

interface FacultyMapProps {
  faculty: Faculty;
}

const FacultyMap: React.FC<FacultyMapProps> = ({ faculty }) => {
  // Simplified map visualization showing buildings where faculty has classes
  const buildings = React.useMemo(() => {
    const allBuildings = new Set<string>();
    
    // Collect all buildings from the faculty's schedule
    Object.values(faculty.schedule).forEach(day => {
      day.sessions.forEach(session => {
        if (session.room?.building) {
          allBuildings.add(session.room.building);
        }
      });
    });
    
    return Array.from(allBuildings);
  }, [faculty]);

  return (
    <Card className="mb-6 overflow-hidden border-2 border-faculty-accent/30 shadow-lg bg-white/90">
      <CardHeader className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin size={18} />
          Campus Location Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative bg-blue-50 rounded-lg min-h-[200px] border border-blue-100 p-4">
          {/* Simple visual map representation */}
          <div className="grid grid-cols-2 gap-4">
            {buildings.map((building, index) => (
              <div 
                key={building}
                className={`bg-white p-3 rounded-md shadow-md border-2 border-faculty-accent/30 flex items-center justify-between ${
                  index % 2 === 0 ? 'animate-pulse-slow' : ''
                }`}
              >
                <div className="flex items-center">
                  <School className="mr-2 text-faculty-primary" size={20} />
                  <span className="font-medium">{building}</span>
                </div>
                <MapPin className="text-faculty-accent" size={20} />
              </div>
            ))}
          </div>
          
          {/* Faculty Icon */}
          <div className="absolute bottom-5 right-5 bg-faculty-primary text-white p-2 rounded-full shadow-lg flex items-center justify-center animate-bounce-slow">
            <BookOpen size={24} />
          </div>
          
          <p className="text-sm text-gray-500 mt-4 text-center italic">
            Interactive campus map visualization showing {faculty.name}'s locations
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyMap;
