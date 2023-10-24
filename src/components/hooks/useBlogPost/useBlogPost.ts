import { BlogPost } from '@/types';
import { useEffect, useState, useCallback } from 'react';
import { useResource } from '@/components/hooks';

export const useBlogPost = (id?: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { loadResource } = useResource();

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

  return { post, error, loading };
};
