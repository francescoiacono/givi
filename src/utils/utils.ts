import { v4 as uuidv4 } from 'uuid';
import { BlogPost } from '@/types';
import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH } from '@/utils/constants';

class Utils {
  // Format date to long format (Nov 1, 2023)
  public formatDateLong = (dateInput: string | number | Date): string => {
    const date = new Date(dateInput);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formattedDate = Intl.DateTimeFormat('en', options).format(date);

    return formattedDate;
  };

  // Format date to short format (1/11/2023)
  public formateDateShort = (dateInput: string | number | Date): string => {
    const date = new Date(dateInput);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const formattedDate = Intl.DateTimeFormat('en', options).format(date);

    return formattedDate;
  };

  // Check if email is valid
  public isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Check if password is valid
  public isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // Check if title is valid
  public validateTitle = (title: string): string | null => {
    if (!title.trim()) return 'A title is required';
    if (title.length > MAX_TITLE_LENGTH) {
      return `Title must be less or equal to ${MAX_TITLE_LENGTH}  characters`;
    }
    return null;
  };

  // Check if summary is valid
  public validateSummary = (summary: string): string | null => {
    if (summary.length > MAX_SUMMARY_LENGTH) {
      return `Summary must be less or equal to ${MAX_SUMMARY_LENGTH} characters`;
    }
    return null;
  };

  // Create new blog post object
  public newBlogPost = (
    title: string,
    summary: string,
    content: string
  ): BlogPost => {
    const newPost = new BlogPost(
      uuidv4(),
      title,
      content,
      summary,
      -Date.now()
    );
    return newPost;
  };

  // Update blog post object
  public updatedBlogPost = (
    id: string,
    title: string,
    summary: string,
    content: string,
    date: number
  ): BlogPost => {
    const updatedPost = new BlogPost(id, title, content, summary, date * -1);
    return updatedPost;
  };

  // Strip HTML tags from string
  public stripHtmlTags = (input: string): string => {
    return input.replace(/<\/?[^>]+(>|$)/g, ' ').trim();
  };
}

export const utils = new Utils();
