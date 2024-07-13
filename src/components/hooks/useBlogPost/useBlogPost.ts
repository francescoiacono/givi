import { BlogPost } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useAuth, useResource } from '@/components/hooks';
import { utils } from '@/utils';

export const useBlogPost = (id?: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { getToken } = useAuth();
  const { loadResource, updateResource, saveResource } = useResource();

  /**
   * Loads a blog post from the server.
   */
  const loadPost = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await loadResource(`/api/posts/${id}`);
      let data = response.data;
      if (data.date < 0) {
        data.date = data.date * -1;
      }
      setPost(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError((e as Error['message']) || 'Error while loading post');
      setLoading(false);
    }
  }, [id, loadResource]);

  /**
   * Saves a blog post.
   *
   * @param title - The title of the blog post.
   * @param summary - The summary of the blog post.
   * @param content - The content of the blog post.
   * @returns The ID of the saved blog post.
   */
  const savePost = useCallback(
    async (title: string, summary: string, content: string) => {
      try {
        // Check if user is authenticated
        const authToken = await getToken();

        // Create a new post object or update the existing one
        const updatedPost = id
          ? utils.updatedBlogPost(
              id,
              title,
              summary,
              content,
              post?.date || Date.now()
            )
          : utils.newBlogPost(title, summary, content);

        // If id is present, update the post, otherwise save a new one
        if (id) {
          await updateResource<BlogPost>(
            `/api/posts/${id}`,
            updatedPost,
            authToken
          );
        } else {
          await saveResource<BlogPost>('/api/posts', updatedPost, authToken);
        }
        return updatedPost.id;
      } catch (e) {
        setError((e as Error['message']) || 'Error while saving post');
      }
    },
    [getToken, id, post?.date, saveResource, updateResource]
  );

  // Load the post if id is provided
  useEffect(() => {
    // If id is not provided, set loading to false and return
    if (!id) {
      setLoading(false);
      return;
    }

    // If post is not available, load the post
    if (!post) {
      loadPost();
    }
  }, [post, id, loadPost]);

  return { post, error, loading, savePost };
};
