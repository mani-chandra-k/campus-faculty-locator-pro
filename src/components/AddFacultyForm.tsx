
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { addFacultyMember } from "@/utils/facultyData";
import { useToast } from "@/components/ui/use-toast";

interface AddFacultyFormProps {
  onFacultyAdded: (facultyName: string) => void;
}

interface FormValues {
  facultyName: string;
}

const AddFacultyForm: React.FC<AddFacultyFormProps> = ({ onFacultyAdded }) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      facultyName: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.facultyName.trim().length === 0) {
      toast({
        title: "Error",
        description: "Faculty name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newFaculty = addFacultyMember(data.facultyName.trim());
      toast({
        title: "Faculty added successfully",
        description: `${newFaculty.name} (ID: ${newFaculty.id}) has been added with a generated schedule.`,
      });
      form.reset();
      onFacultyAdded(newFaculty.name);
    } catch (error) {
      toast({
        title: "Error adding faculty",
        description: "There was a problem adding the faculty member.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-faculty-primary mb-4 flex items-center gap-2">
        <UserPlus size={24} />
        Add New Faculty
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="facultyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter new faculty name" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="w-full md:w-auto"
          >
            <UserPlus size={16} className="mr-2" />
            Add Faculty with Generated Schedule
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddFacultyForm;
