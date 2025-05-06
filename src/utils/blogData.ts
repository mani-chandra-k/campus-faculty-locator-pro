
import { BlogPost, BlogComment } from './types';

// Sample blog posts data
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'New Faculty Scheduling System Released',
    content: 'We are excited to announce the release of our new faculty scheduling system. This system will help students locate their professors more efficiently and improve campus communication.',
    author: 'Admin',
    authorId: 'admin1',
    createdAt: new Date('2025-04-30'),
    category: 'Announcements',
    tags: ['scheduling', 'faculty', 'new features']
  },
  {
    id: '2',
    title: 'How to Use the Faculty Locator App',
    content: 'This tutorial will guide you through using the Faculty Locator App. Learn how to search for faculty members, view their schedules, and find their current location on campus.',
    author: 'Tech Support',
    authorId: 'tech1',
    createdAt: new Date('2025-05-01'),
    category: 'Tutorials',
    tags: ['guide', 'tutorial', 'how-to']
  },
  {
    id: '3',
    title: 'Faculty Office Hours Update for Summer Semester',
    content: 'With the summer semester approaching, many faculty members have updated their office hours. Check this post for the latest information on faculty availability during the summer months.',
    author: 'Department Chair',
    authorId: 'chair1',
    createdAt: new Date('2025-05-03'),
    category: 'Updates',
    tags: ['summer', 'office hours', 'schedule']
  }
];

// Sample blog comments
const sampleBlogComments: BlogComment[] = [
  {
    id: '1',
    postId: '1',
    author: 'Student123',
    content: 'This is great news! Looking forward to using the new system.',
    createdAt: new Date('2025-04-30T14:22:00')
  },
  {
    id: '2',
    postId: '1',
    author: 'Faculty456',
    content: 'I\'ve been testing this system and it\'s a significant improvement!',
    createdAt: new Date('2025-04-30T16:45:00')
  },
  {
    id: '3',
    postId: '2',
    author: 'NewUser789',
    content: 'Thanks for the tutorial, very helpful for new users like me.',
    createdAt: new Date('2025-05-02T09:15:00')
  }
];

// Blog post management functions
let blogPosts = [...sampleBlogPosts];
let blogComments = [...sampleBlogComments];

export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getCommentsByPostId = (postId: string): BlogComment[] => {
  return blogComments
    .filter(comment => comment.postId === postId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

export const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt'>): BlogPost => {
  const newPost: BlogPost = {
    ...post,
    id: `post-${Date.now()}`,
    createdAt: new Date()
  };
  
  blogPosts.push(newPost);
  return newPost;
};

export const addComment = (comment: Omit<BlogComment, 'id' | 'createdAt'>): BlogComment => {
  const newComment: BlogComment = {
    ...comment,
    id: `comment-${Date.now()}`,
    createdAt: new Date()
  };
  
  blogComments.push(newComment);
  return newComment;
};

export const deleteBlogPost = (id: string): boolean => {
  const initialLength = blogPosts.length;
  blogPosts = blogPosts.filter(post => post.id !== id);
  
  // Also delete all comments associated with this post
  blogComments = blogComments.filter(comment => comment.postId !== id);
  
  return blogPosts.length < initialLength;
};

export const deleteComment = (id: string): boolean => {
  const initialLength = blogComments.length;
  blogComments = blogComments.filter(comment => comment.id !== id);
  return blogComments.length < initialLength;
};

export const getAllCategories = (): string[] => {
  const categoriesSet = new Set(blogPosts.map(post => post.category));
  return Array.from(categoriesSet);
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set(blogPosts.flatMap(post => post.tags));
  return Array.from(tagsSet);
};

export const updateBlogPost = (id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): BlogPost | undefined => {
  const postIndex = blogPosts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return undefined;
  }
  
  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    ...updates
  };
  
  return blogPosts[postIndex];
};
