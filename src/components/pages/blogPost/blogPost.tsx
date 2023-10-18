'use client';

import { useResource } from '@/components/hooks';
import { FlexCol, Wrapper } from '@/components/layouts';
import { useEffect, useState } from 'react';
import { BlogPost as BlogPostType } from '@/types';
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

  return (
    <Wrapper>
      <FlexCol>
        <h1>{post?.title}</h1>
        <div>{parse(post?.content || '')}</div>
      </FlexCol>
    </Wrapper>
  );
};
