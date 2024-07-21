'use client';

import { useResource } from '@/components/hooks';
import { PostItem } from './postItem';
import { memo, useCallback, useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { Button, CircularLoading, ClientErrorMessage } from '@/components/ui';
import { FlexCol } from '@/components/layouts';
import { REQ_LIMIT } from '@/utils/constants';
import useSWR from 'swr';

export const PostsComponent = () => {
  const { loadResource } = useResource();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [lastKey, setLastKey] = useState<number | null>(null);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  /**
   * Returns the URL for fetching posts.
   * @param key - The last key of the previous fetch, if available.
   * @returns The URL string for fetching posts.
   */
  const getUrl = (key?: number | null) =>
    `/api/posts?limit=${REQ_LIMIT}${key ? `&lastKey=${key}` : ''}`;

  const { data, error } = useSWR('recentPosts', () => loadResource(getUrl()), {
    revalidateOnFocus: false
  });

  useEffect(() => {
    // Update posts and lastKey when data is available
    if (data && data.data) {
      setPosts(data.data);
      if (data.data.length > 0) {
        const lastPost = data.data[data.data.length - 1];
        setLastKey(-lastPost.date);
      }
    }
  }, [data]);

  /**
   * Loads more posts from the specified URL and updates the state with the new posts.
   * @returns A promise that resolves when the posts are loaded and the state is updated.
   */
  const loadMorePosts = useCallback(async () => {
    const res = await loadResource(getUrl(lastKey));
    if (res) {
      setPosts(prevPosts => [...prevPosts, ...res.data]);

      // Update the last key
      if (res.data.length > 0) {
        const lastPost = res.data[res.data.length - 1];
        setLastKey(-lastPost.date);
      }

      // Check if the number of posts returned is less than the request limit
      if (res.data.length < REQ_LIMIT) {
        setHasMorePosts(false);
      }
    }
  }, [lastKey, loadResource]);

  if (error) return <ClientErrorMessage>{error}</ClientErrorMessage>;

  return (
    <FlexCol className='mt-4 w-full ml-4'>
      <h2>Recent Posts</h2>
      {!data ? (
        <CircularLoading />
      ) : posts.length > 0 ? (
        <>
          {posts.map(post => (
            <PostItem key={post.id} blogPost={post} />
          ))}
          {lastKey && hasMorePosts && (
            <Button variant='secondary' onClick={loadMorePosts}>
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

const Posts = memo(PostsComponent);
Posts.displayName = 'Posts';

export { Posts };
