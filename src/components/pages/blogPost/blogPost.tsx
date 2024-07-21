'use client';

import { useBlogPost, useResource } from '@/components/hooks';
import { FlexCol, FlexRow } from '@/components/layouts';
import { CircularLoading, ClientErrorMessage } from '@/components/ui';
import { utils } from '@/utils';
import { PostOptions } from './postOptions';
import parse from 'html-react-parser';

interface BlogPostProps {
  postId: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ postId }) => {
  const { post, error, loading } = useBlogPost(postId);

  if (loading) return <CircularLoading />;

  if (!post)
    return (
      <ClientErrorMessage>{error || 'Post not found!'}</ClientErrorMessage>
    );

  return (
    <main className='ql-editor'>
      <FlexRow>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex w-full justify-between'>
            <p>{utils.formatDateLong(post.date)}</p>
            <PostOptions id={postId} />
          </div>
          <h1 className='font-bold'>{post.title}</h1>
          {post.summary && <h2>{post.summary}</h2>}
        </div>
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
