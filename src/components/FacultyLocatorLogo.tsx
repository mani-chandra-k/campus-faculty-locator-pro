
import React from "react";
import { GraduationCap, MapPin, Book, Search } from "lucide-react";

const FacultyLocatorLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 animate-fade-in">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-faculty-primary to-faculty-accent flex items-center justify-center shadow-lg">
          {/* Inner circle */}
          <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center relative">
            {/* Main icon */}
            <GraduationCap className="w-12 h-12 text-faculty-primary" />
            
            {/* Orbiting icons */}
            <div className="absolute w-full h-full animate-spin-slow">
              <MapPin className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-faculty-accent" />
              <Book className="absolute top-1/2 right-0 transform translate-y-1/2 w-6 h-6 text-faculty-secondary" />
              <Search className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 text-faculty-primary" />
            </div>
          </div>
        </div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-faculty-primary animate-ping opacity-20"></div>
      </div>

      <h3 className="mt-4 text-xl font-bold bg-gradient-to-r from-faculty-primary to-faculty-accent bg-clip-text text-transparent">
        Campus Faculty Locator Pro
      </h3>
      <p className="text-sm text-gray-500">Find faculty members quickly across campus</p>
    </div>
  );
};

export default FacultyLocatorLogo;
