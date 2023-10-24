import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH } from '@/utils/constants';

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 6;
};

export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return 'A title is required';
  if (title.length > MAX_TITLE_LENGTH) {
    return `Title must be less or equal to ${MAX_TITLE_LENGTH}  characters`;
  }

  return null;
};

export const validateSummary = (summary: string): string | null => {
  if (summary.length > MAX_SUMMARY_LENGTH) {
    return `Summary must be less or equal to ${MAX_SUMMARY_LENGTH} characters`;
  }
  return null;
};
