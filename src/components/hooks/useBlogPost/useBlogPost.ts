import { BlogPost } from '@/types';
import { useEffect, useState, useCallback } from 'react';
import { useResource } from '@/components/hooks';
import { newBlogPost, updatedBlogPost } from '@/utils';

export const useBlogPost = (id?: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { loadResource, updateResource, saveResource } = useResource();

  useEffect(() => {
    if (!id) return;

    const loadPost = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await loadResource(`/api/post/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError((e as Error['message']) || 'Error while loading post');
        setLoading(false);
      }
    };
    if (!post) {
      loadPost();
    }
  }, [post, id]);

  const savePost = async (
    title: string,
    summary: string,
    content: string,
    authToken: string
  ) => {
    // Create a new post object
    const post = id
      ? updatedBlogPost(id, title, summary, content)
      : newBlogPost(title, summary, content);

    // If id is present, update the post, otherwise save a new one
    if (id) {
      await updateResource<BlogPost>(`/api/post/${id}`, post, authToken);
    } else {
      await saveResource<BlogPost>('/api/post', post, authToken);
    }

    return post.id;
  };

  return { post, error, loading, savePost };
};
