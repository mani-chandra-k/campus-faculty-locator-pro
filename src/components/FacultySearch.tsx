
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllFacultyNames } from "@/utils/facultyData";
import { Card } from "./ui/card";

interface FacultySearchProps {
  onSearch: (facultyName: string) => void;
}

const FacultySearch: React.FC<FacultySearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const facultyNames = getAllFacultyNames();

  const handleInputSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const handleSelectSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border border-faculty-accent/20">
      <h2 className="text-2xl font-bold text-faculty-primary mb-5 flex items-center">
        <Search className="mr-2" size={24} />
        Find Faculty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <form className="md:col-span-3" onSubmit={handleInputSearch}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by faculty name or ID..."
              className="pl-10 border-faculty-secondary/30 focus:border-faculty-accent focus:ring-faculty-accent"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-faculty-secondary" 
              size={16} 
            />
          </div>
        </form>
        
        <div className="md:col-span-2">
          <Select onValueChange={handleSelectSearch}>
            <SelectTrigger className="w-full border-faculty-secondary/30 focus:border-faculty-accent focus:ring-faculty-accent">
              <SelectValue placeholder="Select faculty" />
            </SelectTrigger>
            <SelectContent>
              {facultyNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          onClick={() => onSearch(searchValue)} 
          className="bg-faculty-primary hover:bg-faculty-accent transition-all duration-300"
        >
          <Search size={16} className="mr-2" />
          Search
        </Button>
      </div>
    </Card>
  );
};

export default FacultySearch;
