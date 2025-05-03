
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
      setIsAdding(true);
      const newFaculty = addFacultyMember(data.facultyName.trim());
      toast({
        title: "Faculty added successfully",
        description: `${newFaculty.name} (ID: ${newFaculty.id}) has been added with a generated schedule.`,
      });
      form.reset();
      onFacultyAdded(newFaculty.name);
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      toast({
        title: "Error adding faculty",
        description: "There was a problem adding the faculty member.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="facultyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-faculty-primary font-medium">Faculty Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter new faculty name" 
                    {...field} 
                    className="border-faculty-secondary/30 focus:border-faculty-accent focus:ring-faculty-accent"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-faculty-primary to-faculty-accent hover:opacity-90 transition-all duration-300"
            disabled={isAdding}
          >
            <UserPlus size={18} className="mr-2" />
            {isAdding ? "Adding Faculty..." : "Add Faculty with Generated Schedule"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddFacultyForm;
