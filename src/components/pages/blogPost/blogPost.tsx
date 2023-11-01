'use client';

import { useBlogPost, useResource } from '@/components/hooks';
import { FlexCol, FlexRow } from '@/components/layouts';
import { ClientErrorMessage } from '@/components/ui';
import { utils } from '@/utils';
import { PostOptions } from './postOptions';
import parse from 'html-react-parser';

interface BlogPostProps {
  postId: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ postId }) => {
  const { post, error, loading } = useBlogPost(postId);

  if (loading) return <h1>Loading...</h1>;

  if (!post)
    return (
      <ClientErrorMessage>{error || 'Post not found!'}</ClientErrorMessage>
    );

  return (
    <main>
      <FlexRow>
        <FlexCol>
          <h1 className='font-bold'>{post.title}</h1>
          <div>
            {'Gabriele Vecchi'} • {utils.formatDateLong(post.date)}
          </div>
        </FlexCol>
        <PostOptions id={postId} />
      </FlexRow>
      <div className='mt-4 w-full border-b border-gray-400'></div>
      <FlexCol>
        <div className='pt-4 flex flex-col gap-3'>
          {parse(post.content || '')}
        </div>
      </FlexCol>
    </main>
  );
};
