'use client';

import { useResource } from '@/components/hooks';
import { FlexCol } from '@/components/layouts';
import { useEditorInstance } from '@/components/providers';
import { Button, Input, TinyMCEEditor } from '@/components/ui';
import { BlogPost } from '@/types';
import { newBlogPost } from '@/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const NewPostEditor = () => {
  const [title, setTitle] = useState('');
  const { editorRef, editorReady } = useEditorInstance();
  const { saveResource } = useResource();
  const router = useRouter();

  const savePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editorRef.current && editorReady) {
        const content = editorRef.current.getContent();
        const newPost = newBlogPost(title, content);
        await saveResource<BlogPost>('/api/post', newPost);
        router.push(`/post/${newPost.id}`);
      } else {
        throw new Error('Editor is not ready');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={savePost}>
      <FlexCol>
        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <TinyMCEEditor />
        <Button>Save Post</Button>
      </FlexCol>
    </form>
  );
};
