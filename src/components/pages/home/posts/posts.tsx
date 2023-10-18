'use client';
import { useResource } from '@/components/hooks';
import { PostItem } from './postItem';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';

export const Posts = () => {
  const { loadResource } = useResource();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await loadResource('/api/post');
        if (res) {
          setPosts(res.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error as Error['message']);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <>
      <h2>All Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <PostItem key={post.id} blogPost={post} />)
      )}
    </>
  );
};
