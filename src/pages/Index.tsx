
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FacultySearch from "@/components/FacultySearch";
import WeeklySchedule from "@/components/WeeklySchedule";
import { Faculty } from "@/utils/types";
import { findFacultyByName } from "@/utils/facultyData";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();

  const handleSearch = (facultyName: string) => {
    const faculty = findFacultyByName(facultyName);
    
    if (faculty) {
      setSelectedFaculty(faculty);
    } else {
      toast({
        title: "Faculty not found",
        description: "Could not find faculty with that name or ID. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-faculty-background">
      <header className="bg-faculty-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Campus Faculty Locator Pro</h1>
          <p className="mt-2 text-lg opacity-90">Find faculty members quickly across campus</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FacultySearch onSearch={handleSearch} />

        {!selectedFaculty ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Faculty Locator</CardTitle>
              <CardDescription>
                Find where faculty members are located throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-lg text-gray-700 mb-4">
                  Search for a faculty member by name or ID to view their schedule.
                </p>
                <p className="text-gray-600">
                  Available faculty: Revathi, Shamila, Saritha, Nethrasri, Yesu, Rajini
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-faculty-primary">{selectedFaculty.name}'s Schedule</h2>
              <p className="text-gray-600">Faculty ID: {selectedFaculty.id}</p>
            </div>
            <WeeklySchedule faculty={selectedFaculty} />
          </>
        )}
      </main>

      <footer className="bg-faculty-primary text-white py-4 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Campus Faculty Locator Pro</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
