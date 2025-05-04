
import React, { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FacultySearch from "@/components/FacultySearch";
import WeeklySchedule from "@/components/WeeklySchedule";
import FacultyLocationBox from "@/components/FacultyLocationBox";
import AddFacultyForm from "@/components/AddFacultyForm";
import FacultyLocatorLogo from "@/components/FacultyLocatorLogo";
import FacultyMap from "@/components/FacultyMap";
import { Faculty } from "@/utils/types";
import { findFacultyByName, getAllFacultyNames } from "@/utils/facultyData";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, School, Book, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();
  const facultyNames = getAllFacultyNames();

  const handleSearch = (facultyName: string) => {
    const faculty = findFacultyByName(facultyName);
    
    if (faculty) {
      setSelectedFaculty(faculty);
      toast({
        title: "Faculty found",
        description: `Showing schedule for ${faculty.name}`,
      });
    } else {
      toast({
        title: "Faculty not found",
        description: "Could not find faculty with that name or ID. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleFacultyAdded = (facultyName: string) => {
    handleSearch(facultyName);
    toast({
      title: "Faculty added successfully",
      description: `${facultyName} has been added to the faculty list`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-faculty-background to-blue-50">
      <header className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Campus Faculty Locator Pro</h1>
          <p className="mt-2 text-xl opacity-90 text-center">Find faculty members quickly across campus</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <FacultySearch onSearch={handleSearch} />
          </div>
          
          <div className="bg-gradient-to-br from-white/70 to-faculty-secondary/10 backdrop-blur-sm p-6 rounded-lg shadow-md border border-faculty-accent/20 animate-fade-in">
            <h3 className="text-lg font-semibold text-faculty-primary mb-3 flex items-center">
              <School size={20} className="mr-2" />
              Available Faculty
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {facultyNames.map(name => (
                <Button 
                  key={name} 
                  variant="outline" 
                  className="border-faculty-accent/30 hover:bg-faculty-accent/10 transition-all duration-300 hover:scale-105"
                  onClick={() => handleSearch(name)}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {!selectedFaculty ? (
          <Card className="bg-white/80 backdrop-blur-sm border border-faculty-accent/20 shadow-lg animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-faculty-secondary/10 to-faculty-accent/10">
              <CardTitle className="text-center text-faculty-primary">Welcome to Faculty Locator</CardTitle>
              <CardDescription className="text-center">
                Find where faculty members are located throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FacultyLocatorLogo />
              <div className="text-center py-6">
                <p className="text-xl text-gray-700 mb-6">
                  Search for a faculty member by name or ID to view their schedule.
                </p>
                <div className="max-w-lg mx-auto">
                  <img 
                    src="/placeholder.svg" 
                    alt="Faculty Locator" 
                    className="w-full h-48 object-cover rounded-lg opacity-70"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 bg-gradient-to-r from-white/90 to-faculty-secondary/10 p-6 rounded-lg shadow-md border border-faculty-accent/20 animate-fade-in">
              <h2 className="text-3xl font-bold text-faculty-primary flex items-center">
                <Book className="mr-3" size={28} />
                {selectedFaculty.name}'s Schedule
              </h2>
              <p className="text-gray-600">Faculty ID: {selectedFaculty.id}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <FacultyLocationBox faculty={selectedFaculty} />
                <FacultyMap faculty={selectedFaculty} />
              </div>
              <div>
                <WeeklySchedule faculty={selectedFaculty} />
              </div>
            </div>
          </>
        )}
        
        {/* Add Faculty Form - Moved to bottom with attractive design */}
        <div className="mt-10 bg-gradient-to-br from-faculty-primary/5 to-faculty-accent/5 p-8 rounded-xl shadow-lg border border-faculty-accent/20 animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-faculty-primary to-faculty-accent rounded-full mb-4 shadow-lg">
              <UserPlus size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-faculty-primary">
              Add New Faculty Member
            </h2>
            <p className="text-gray-600 mt-2">Create a new faculty member with auto-generated schedule</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-faculty-accent/10 rounded-lg p-6 shadow-md">
            <AddFacultyForm onFacultyAdded={handleFacultyAdded} />
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2025 Campus Faculty Locator Pro</p>
          <p className="text-sm opacity-80 mt-1">Helping you find faculty members efficiently</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
