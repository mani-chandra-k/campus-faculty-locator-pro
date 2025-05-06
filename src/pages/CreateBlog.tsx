
import React from "react";
import Navigation from "@/components/Navigation";
import BlogCreator from "@/components/BlogCreator";
import { BookPlus } from "lucide-react";

const CreateBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-faculty-background to-blue-50">
      <Navigation />
      
      <header className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center">
            <BookPlus className="text-white/80 h-10 w-10 mr-3 animate-bounce-slow" />
            <div>
              <h1 className="text-4xl font-bold text-center">Create New Blog Post</h1>
              <p className="mt-2 text-xl opacity-90 text-center">Share updates and announcements with the campus community</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <BlogCreator />
      </main>
    </div>
  );
};

export default CreateBlog;
