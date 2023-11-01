import { BlogPost } from '@/types';
import { useEffect, useState } from 'react';
import { useAuth, useResource } from '@/components/hooks';
import { newBlogPost, updatedBlogPost } from '@/utils';

export const useBlogPost = (id?: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { getToken } = useAuth();
  const { loadResource, updateResource, saveResource } = useResource();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await loadResource(`/api/posts/${id}`);
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

  const savePost = async (title: string, summary: string, content: string) => {
    try {
      // Check if user is authenticated
      const authToken = await getToken();

      // Create a new post object
      const post = id
        ? updatedBlogPost(id, title, summary, content)
        : newBlogPost(title, summary, content);

      // If id is present, update the post, otherwise save a new one
      if (id) {
        await updateResource<BlogPost>(`/api/posts/${id}`, post, authToken);
      } else {
        await saveResource<BlogPost>('/api/posts', post, authToken);
      }
      return post.id;
    } catch (e) {
      setError((e as Error['message']) || 'Error while saving post');
    }
  };

  return { post, error, loading, savePost };
};
