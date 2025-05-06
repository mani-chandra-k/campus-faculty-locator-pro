
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlogPost } from "@/utils/blogData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { BookOpen, Save, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (!currentTag.trim()) return;
    
    if (!tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
    }
    setCurrentTag("");
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !author.trim() || !category.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newPost = addBlogPost({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      authorId: author.toLowerCase().replace(/\s+/g, '-'),
      category: category.trim(),
      tags: tags.length > 0 ? tags : ["general"]
    });
    
    toast({
      title: "Blog Post Created",
      description: "Your post has been published successfully"
    });
    
    navigate(`/blog/${newPost.id}`);
  };
  
  return (
    <Card className="border border-faculty-accent/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white">
        <CardTitle className="flex items-center justify-center">
          <BookOpen size={24} className="mr-2" />
          <span>Create New Blog Post</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-faculty-accent/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-faculty-accent/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              placeholder="E.g., Announcements, Tutorials, Updates"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-faculty-accent/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="border-faculty-accent/30"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={handleAddTag}
                className="flex-shrink-0"
              >
                <Plus size={18} />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-faculty-secondary text-white flex items-center gap-1">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] border-faculty-accent/30"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/blog')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-faculty-primary hover:bg-faculty-primary/90"
            >
              <Save size={18} className="mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogCreator;
