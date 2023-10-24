'use client';

import { useAuth, useBlogPost, useResource } from '@/components/hooks';
import { FlexCol } from '@/components/layouts';
import { useEditorInstance } from '@/components/providers';
import {
  Button,
  ClientErrorMessage,
  Input,
  TinyMCEEditor,
} from '@/components/ui';
import { BlogPost } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { newBlogPost, updatedBlogPost } from '@/utils';
import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH } from '@/utils/constants';

interface PostEditor {
  id?: string;
}

export const PostEditor: React.FC<PostEditor> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { editorRef, editorReady } = useEditorInstance();
  const { saveResource, updateResource } = useResource();
  const router = useRouter();
  const { user } = useAuth();
  const { post } = useBlogPost(id || '');

  useEffect(() => {
    // If id is present, load the post body and title to populate editor
    const loadPostBody = async () => {
      try {
        if (post) {
          const { title, summary, content } = post;
          if (editorRef.current && editorReady) {
            setTitle(title);
            setSummary(summary);
            setEditorContent(content);
          }
        }
      } catch (error) {
        setError(error as Error['message']);
      }
    };

    if (editorReady && post) {
      loadPostBody();
    }
  }, [editorReady, editorRef, id, post]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return setError('A title is required.');
    if (title.length > MAX_TITLE_LENGTH) {
      return setError(
        `Title must be less or equal to ${MAX_TITLE_LENGTH}  characters`
      );
    }

    if (summary.length > MAX_SUMMARY_LENGTH) {
      return setError(
        `Summary must be less or equal to ${MAX_SUMMARY_LENGTH} characters`
      );
    }

    try {
      // If editor is ready, get the content and save it in DB
      if (editorRef.current && editorReady) {
        const content = editorRef.current.getContent();

        // Create a new post object
        const post = id
          ? updatedBlogPost(id, title, summary, content)
          : newBlogPost(title, summary, content);

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

  return user ? (
    <main>
      {error && <ClientErrorMessage>{error}</ClientErrorMessage>}
      <form onSubmit={submitPost}>
        <FlexCol>
          <h1>New Post</h1>
          <Input
            type='text'
            placeholder='Give your work a title'
            id='title'
            label='Title'
            value={title}
            maxLength={MAX_TITLE_LENGTH}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type='text'
            placeholder='A summary of your post'
            id='summary'
            label='Summary'
            value={summary}
            maxLength={MAX_SUMMARY_LENGTH}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TinyMCEEditor initialValue={editorContent} />
          <Button type='submit'>Save Post</Button>
        </FlexCol>
      </form>
    </main>
  ) : (
    <ClientErrorMessage>
      You are not authenticated. Please sign in and try again.
    </ClientErrorMessage>
  );
};
