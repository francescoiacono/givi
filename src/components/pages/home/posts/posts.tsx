'use client';

import { useResource } from '@/components/hooks';
import { PostItem } from './postItem';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { ClientErrorMessage } from '@/components/ui';

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

  if (error) return <ClientErrorMessage>{error}</ClientErrorMessage>;

  return (
    <div className='mt-4'>
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} blogPost={post} />)
      ) : (
        <p className='text-gray-400 italic'>Nothing to see here.</p>
      )}
    </div>
  );
};
