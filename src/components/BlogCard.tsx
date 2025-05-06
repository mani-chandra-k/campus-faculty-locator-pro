
import React from "react";
import { BlogPost } from "@/utils/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Tag, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="overflow-hidden h-full border border-faculty-accent/20 transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-faculty-primary/10 to-faculty-accent/10 p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-faculty-primary line-clamp-2">
            {post.title}
          </CardTitle>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <CalendarDays size={14} className="mr-1" />
          <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
          <span className="mx-2">•</span>
          <User size={14} className="mr-1" />
          <span>{post.author}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-700 line-clamp-3 mb-4">
          {truncateContent(post.content, 150)}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-faculty-secondary/5 border-faculty-accent/20">
            {post.category}
          </Badge>
          {post.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-faculty-primary/5 text-faculty-primary border-faculty-primary/20">
              <Tag size={12} className="mr-1" /> {tag}
            </Badge>
          ))}
          {post.tags.length > 2 && (
            <Badge variant="outline" className="bg-gray-100 text-gray-600">
              +{post.tags.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link 
          to={`/blog/${post.id}`}
          className="text-faculty-primary font-medium flex items-center hover:underline"
        >
          Read More <ArrowRight size={16} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
