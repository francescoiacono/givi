'use client';

import { useAuth, useResource } from '@/components/hooks';
import { FlexCol } from '@/components/layouts';
import { useEditorInstance } from '@/components/providers';
import {
  Button,
  ClientErrorMessage,
  Input,
  TinyMCEEditor,
} from '@/components/ui';
import { BlogPost } from '@/types';
import { newBlogPost, updatedBlogPost } from '@/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewPostEditorProps {
  id?: string;
}

export const NewPostEditor: React.FC<NewPostEditorProps> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string>('');
  const { editorRef, editorReady } = useEditorInstance();
  const { saveResource, loadResource, updateResource } = useResource();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If id is present, load the post body and title to populate editor
    const loadPostBody = async () => {
      try {
        const res = await loadResource(`/api/post/${id}`);
        const { title, content } = res.data;
        if (editorRef.current && editorReady) {
          setTitle(title);
          editorRef.current.setContent(content);
        }
      } catch (error) {
        setError(error as Error['message']);
      }
    };

    if (id && editorReady) {
      loadPostBody();
    }

    return () => {
      if (editorRef.current && editorReady) {
        setTitle('');
        editorRef.current.setContent('');
      }
    };
  }, [editorReady, editorRef, id]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // If editor is ready, get the content and save it in DB
      if (editorRef.current && editorReady) {
        const content = editorRef.current.getContent();

        // Create a new post object
        const post = id
          ? updatedBlogPost(id, title, content)
          : newBlogPost(title, content);

        // Get token for Authorization
        const token = await user?.getIdToken();
        if (!token) throw new Error('User is not authenticated');

        // If id is present, update the post, otherwise save a new one
        if (id) {
          await updateResource<BlogPost>(`/api/post/${id}`, post, token);
        } else {
          await saveResource<BlogPost>('/api/post', post, token);
        }

        // Redirect to the new/updatedPost post
        router.push(`/post/${post.id}`);
      } else {
        throw new Error('Editor is not ready');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <ClientErrorMessage>{error}</ClientErrorMessage>;

  return (
    <form onSubmit={submitPost}>
      <FlexCol>
        <h1>New Post</h1>
        <Input
          type='text'
          placeholder='Give your work a title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TinyMCEEditor />
        <Button type='submit'>Save Post</Button>
      </FlexCol>
    </form>
  );
};
