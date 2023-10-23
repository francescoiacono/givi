'use client';

import { useResource } from '@/components/hooks';
import { FlexCol, Wrapper } from '@/components/layouts';
import { useEffect, useState } from 'react';
import { BlogPost as BlogPostType } from '@/types';
import { ClientErrorMessage } from '@/components/ui';
import { formatDateLong } from '@/utils';
import parse from 'html-react-parser';

interface BlogPostProps {
  postId: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ postId }) => {
  const { loadResource } = useResource();
  const [post, setPost] = useState<BlogPostType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const res = await loadResource(`/api/post/${postId}`);
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    loadPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!post) return <ClientErrorMessage>Post not found!</ClientErrorMessage>;

  return (
    <Wrapper>
      <FlexCol>
        <h1 className='font-bold'>{post.title}</h1>
        <div>
          {'Gabriele Vecchi'} • {formatDateLong(post.date)}
        </div>
        <div className='w-full border-b border-gray-300'></div>
        <div className='pt-4 flex flex-col gap-3'>
          {parse(post.content || '')}
        </div>
      </FlexCol>
    </Wrapper>
  );
};
