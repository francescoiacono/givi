'use client';

import { useAuth, useResource } from '@/components/hooks';
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
  const { user } = useAuth();

  const savePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editorRef.current && editorReady) {
        const content = editorRef.current.getContent();
        const newPost = newBlogPost(title, content);
        const token = await user?.getIdToken();
        if (!token) throw new Error('User is not authenticated');
        await saveResource<BlogPost>('/api/post', newPost, token);
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
        <h1>New Post</h1>
        <Input
          type='text'
          placeholder='Give your work a title'
          name='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <TinyMCEEditor />
        <Button type='submit'>Save Post</Button>
      </FlexCol>
    </form>
  );
};
