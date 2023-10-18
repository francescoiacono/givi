import { BlogPost } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const newBlogPost = (title: string, content: string): BlogPost => {
  const newPost: BlogPost = {
    id: uuidv4(),
    title: title,
    content: content,
    date: new Date(),
  };

  return newPost;
};
