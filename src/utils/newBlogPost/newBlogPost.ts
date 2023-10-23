import { BlogPost } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const newBlogPost = (
  title: string,
  summary: string,
  content: string
): BlogPost => {
  const newPost: BlogPost = {
    id: uuidv4(),
    summary: summary,
    title: title,
    content: content,
    date: new Date(),
  };

  return newPost;
};

export const updatedBlogPost = (
  id: string,
  title: string,
  summary: string,
  content: string
): BlogPost => {
  const updatedPost: BlogPost = {
    id: id,
    title: title,
    summary: summary,
    content: content,
    date: new Date(),
  };

  return updatedPost;
};
