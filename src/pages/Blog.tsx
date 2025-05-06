
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { getAllBlogPosts, getAllCategories, getAllTags, getBlogPostsByCategory, getBlogPostsByTag } from "@/utils/blogData";
import { BookOpen, Search, Tag, FileText, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost } from "@/utils/types";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState<"all" | "category" | "tag">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allPosts = getAllBlogPosts();
  const allCategories = getAllCategories();
  const allTags = getAllTags();
  
  // Filter posts based on current filter state
  const filterPosts = (): BlogPost[] => {
    let filtered: BlogPost[] = [];
    
    if (currentFilter === "category" && selectedCategory) {
      filtered = getBlogPostsByCategory(selectedCategory);
    } else if (currentFilter === "tag" && selectedTag) {
      filtered = getBlogPostsByTag(selectedTag);
    } else {
      filtered = [...allPosts];
    }
    
    // Apply search term filter if any
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.content.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredPosts = filterPosts();
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    setCurrentFilter("category");
  };
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
    setCurrentFilter("tag");
  };
  
  const resetFilters = () => {
    setCurrentFilter("all");
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-faculty-background to-blue-50">
      <Navigation />
      
      <header className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center">
            <BookOpen className="text-white/80 h-10 w-10 mr-3 animate-bounce-slow" />
            <div>
              <h1 className="text-4xl font-bold text-center">Faculty Updates & Blog</h1>
              <p className="mt-2 text-xl opacity-90 text-center">Latest news, announcements, and articles</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-faculty-primary">Blog Posts</h2>
          <Link to="/blog/create">
            <Button className="bg-faculty-primary hover:bg-faculty-primary/90">
              <Plus size={18} className="mr-2" />
              New Post
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search blog posts..." 
                    className="pl-10 border-faculty-accent/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {(currentFilter !== "all" || searchTerm) && (
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="whitespace-nowrap"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {currentFilter !== "all" && (
                <div className="mb-6 flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <Filter size={18} className="text-faculty-primary" />
                  <span className="text-gray-700">
                    {currentFilter === "category" && selectedCategory && `Filtered by category: `}
                    {currentFilter === "tag" && selectedTag && `Filtered by tag: `}
                    <Badge className="ml-1 bg-faculty-accent">
                      {currentFilter === "category" ? selectedCategory : selectedTag}
                    </Badge>
                  </span>
                </div>
              )}
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white/70 rounded-lg border border-faculty-accent/20">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Blog Posts Found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try different search terms or " : "There are no posts matching your criteria. "}
                  <Button variant="link" onClick={resetFilters} className="p-0">
                    clear all filters
                  </Button>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="tags">Tags</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <FileText size={18} className="mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {allCategories.map((category) => (
                        <Button 
                          key={category}
                          variant="ghost" 
                          className="justify-start font-normal hover:bg-faculty-primary/10"
                          onClick={() => handleCategoryClick(category)}
                        >
                          <FileText size={16} className="mr-2 text-faculty-primary" />
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tags">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Tag size={18} className="mr-2" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge 
                          key={tag}
                          variant="outline" 
                          className="cursor-pointer hover:bg-faculty-primary/10 transition-colors"
                          onClick={() => handleTagClick(tag)}
                        >
                          <Tag size={12} className="mr-1" /> {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 mt-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent_70%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm opacity-80 mt-1">© 2025 Campus Faculty Locator Pro</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
