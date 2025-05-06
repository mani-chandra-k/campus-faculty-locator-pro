
import React from "react";
import Navigation from "@/components/Navigation";
import UMLDiagrams from "@/components/UMLDiagrams";
import { FileCode } from "lucide-react";

const UMLPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-faculty-background to-blue-50">
      <Navigation />
      
      <header className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center">
            <FileCode className="text-white/80 h-10 w-10 mr-3 animate-bounce-slow" />
            <div>
              <h1 className="text-4xl font-bold text-center">Project UML Diagrams</h1>
              <p className="mt-2 text-xl opacity-90 text-center">System architecture and design documentation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-faculty-primary mb-2">Project Architecture Documentation</h2>
          <p className="text-gray-600">
            These UML diagrams illustrate the system architecture and design of the Faculty Locator Pro application.
            The diagrams show the relationships between components, the data flow, and the interactions between different parts of the system.
          </p>
        </div>
        
        <UMLDiagrams />
        
        <div className="mt-10 bg-white/80 p-6 rounded-lg shadow-md border border-faculty-accent/20">
          <h2 className="text-2xl font-bold text-faculty-primary mb-4">System Overview</h2>
          <p className="text-gray-700 mb-3">
            The Faculty Locator Pro system is designed to help students and staff locate faculty members across the campus.
            It provides real-time information about faculty schedules, current locations, and offers a blog platform for updates and announcements.
          </p>
          
          <h3 className="text-xl font-semibold text-faculty-secondary mt-6 mb-3">Key Components</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Faculty Locator:</strong> Core functionality for searching and locating faculty members.</li>
            <li><strong>Schedule Management:</strong> Weekly and daily schedule displays with current location tracking.</li>
            <li><strong>Campus Map:</strong> Visual representation of building blocks and faculty locations.</li>
            <li><strong>Blog System:</strong> Content management for campus announcements and updates.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-faculty-secondary mt-6 mb-3">Technologies Used</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Shadcn/UI</li>
            <li><strong>State Management:</strong> React Context API, React Query</li>
            <li><strong>Routing:</strong> React Router</li>
            <li><strong>Backend (Potential):</strong> Supabase for authentication and data storage</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default UMLPage;
