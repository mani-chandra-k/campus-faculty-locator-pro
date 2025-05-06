
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Database, LayoutDashboard, Github } from "lucide-react";

const UMLDiagrams = () => {
  const [activeTab, setActiveTab] = useState("class");

  // URL to the uploaded UML diagram image
  const umlImageUrl = "/lovable-uploads/7b5c59fd-d3a2-4c32-8e17-c116121c5778.png";

  return (
    <Card className="border border-faculty-accent/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white">
        <CardTitle className="flex items-center justify-center">
          <FileCode size={24} className="mr-2" />
          <span>UML Diagrams</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none bg-faculty-secondary/10">
            <TabsTrigger value="class" className="data-[state=active]:bg-faculty-accent data-[state=active]:text-white">
              Class Diagram
            </TabsTrigger>
            <TabsTrigger value="sequence" className="data-[state=active]:bg-faculty-accent data-[state=active]:text-white">
              Sequence Diagram
            </TabsTrigger>
            <TabsTrigger value="component" className="data-[state=active]:bg-faculty-accent data-[state=active]:text-white">
              Component Diagram
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="class" className="m-0 p-6">
            <div className="bg-white rounded-md shadow-inner p-4">
              <h3 className="text-xl font-medium text-faculty-primary mb-4 flex items-center">
                <Database size={20} className="mr-2" /> Class Diagram
              </h3>
              <p className="text-gray-600 mb-4">
                This diagram shows the structure of the Faculty Locator system, including classes, attributes, operations, and relationships.
              </p>
              <div className="border border-faculty-accent/10 rounded-md overflow-hidden">
                <img 
                  src={umlImageUrl} 
                  alt="Class Diagram" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sequence" className="m-0 p-6">
            <div className="bg-white rounded-md shadow-inner p-4">
              <h3 className="text-xl font-medium text-faculty-primary mb-4 flex items-center">
                <LayoutDashboard size={20} className="mr-2" /> Sequence Diagram
              </h3>
              <p className="text-gray-600 mb-4">
                This diagram illustrates how objects interact with each other to locate faculty members and display their schedules.
              </p>
              <div className="border border-faculty-accent/10 rounded-md overflow-hidden">
                <img 
                  src={umlImageUrl} 
                  alt="Sequence Diagram" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="component" className="m-0 p-6">
            <div className="bg-white rounded-md shadow-inner p-4">
              <h3 className="text-xl font-medium text-faculty-primary mb-4 flex items-center">
                <Github size={20} className="mr-2" /> Component Diagram
              </h3>
              <p className="text-gray-600 mb-4">
                This diagram shows the organization and dependencies between components in the Faculty Locator system.
              </p>
              <div className="border border-faculty-accent/10 rounded-md overflow-hidden">
                <img 
                  src={umlImageUrl} 
                  alt="Component Diagram" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UMLDiagrams;
