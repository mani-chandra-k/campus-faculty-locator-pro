
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { getBlogPostById, getCommentsByPostId, addComment } from "@/utils/blogData";
import { format } from "date-fns";
import { CalendarDays, User, Tag, ArrowLeft, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  
  if (!id) {
    navigate("/blog");
    return null;
  }
  
  const post = getBlogPostById(id);
  
  if (!post) {
    navigate("/blog");
    return null;
  }
  
  const comments = getCommentsByPostId(id);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentAuthor.trim() || !commentContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both name and comment fields",
        variant: "destructive"
      });
      return;
    }
    
    addComment({
      postId: id,
      author: commentAuthor,
      content: commentContent,
    });
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
    
    // Reset the form
    setCommentAuthor("");
    setCommentContent("");
    
    // Force rerender to show new comment
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-faculty-background to-blue-50">
      <Navigation />
      
      <header className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center text-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
              <div className="flex items-center justify-center text-sm mt-4">
                <User size={16} className="mr-1" />
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <CalendarDays size={16} className="mr-1" />
                <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="flex items-center mb-6"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Blog
          </Button>
          
          <div className="bg-white/90 rounded-lg shadow-md p-6 border border-faculty-accent/20">
            {post.image && (
              <div className="mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto max-h-96 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-faculty-primary">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-faculty-primary/10">
                    <Tag size={12} className="mr-1" /> {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="prose max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Comments section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-faculty-primary mb-6 flex items-center">
            <MessageSquare size={24} className="mr-2" />
            Comments ({comments.length})
          </h2>
          
          <div className="bg-white/80 rounded-lg shadow-sm p-6 border border-faculty-accent/20 mb-8">
            <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
            <form onSubmit={handleSubmitComment}>
              <div className="mb-4">
                <Input
                  placeholder="Your Name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="border-faculty-accent/30"
                />
              </div>
              <div className="mb-4">
                <Textarea
                  placeholder="Write your comment here..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="min-h-[100px] border-faculty-accent/30"
                />
              </div>
              <Button type="submit" className="bg-faculty-primary hover:bg-faculty-primary/90">
                Post Comment
              </Button>
            </form>
          </div>
          
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-10 bg-white/70 rounded-lg border border-faculty-accent/10">
                <MessageSquare size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="border border-faculty-accent/10">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold flex items-center">
                        <User size={16} className="mr-2 text-faculty-secondary" />
                        {comment.author}
                      </CardTitle>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
