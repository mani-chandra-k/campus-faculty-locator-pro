
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
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-faculty-primary mb-4">Find Faculty</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <form className="flex-1" onSubmit={handleInputSearch}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by faculty name or ID..."
              className="pl-10"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </form>
        
        <div className="w-full sm:w-auto">
          <Select onValueChange={handleSelectSearch}>
            <SelectTrigger className="w-full sm:w-[200px]">
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
        
        <Button type="submit" onClick={() => onSearch(searchValue)}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default FacultySearch;
