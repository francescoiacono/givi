'use client';

import { useResource } from '@/components/hooks';
import { PostItem } from './postItem';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { Button, ClientErrorMessage } from '@/components/ui';
import { FlexCol } from '@/components/layouts';
import { REQ_LIMIT } from '@/utils/constants';

export const Posts = () => {
  const { loadResource } = useResource();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lastKey, setLastKey] = useState<number | null>(null);

  const loadPosts = async (key?: number) => {
    setLoading(true);
    try {
      const res = await loadResource(
        `/api/posts?limit=${REQ_LIMIT}${key ? `&lastKey=${key}` : ''}`
      );

      if (res) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setLoading(false);

        // Update lastKey if posts are returned
        if (res.data.length > 0) {
          const lastPost = res.data[res.data.length - 1];
          setLastKey(-lastPost.date);
        }
      }
    } catch (error) {
      setError(error as Error['message']);
      setLoading(false);
    }
  };

  // TODO: Fix this hacky solution, posts component is being rendered twice, needs further investigation

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {
      loadPosts();
    }
  }, [isMounted]);

  if (error) return <ClientErrorMessage>{error}</ClientErrorMessage>;

  return (
    <FlexCol className='mt-4 w-full ml-4'>
      <h2>Recent Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : posts && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostItem key={post.id} blogPost={post} />
          ))}
          {lastKey && (
            <Button secondary onClick={() => loadPosts(lastKey)}>
              Load More
            </Button>
          )}
        </>
      ) : (
        <p className='text-gray-400 italic'>Nothing to see here.</p>
      )}
    </FlexCol>
  );
};
