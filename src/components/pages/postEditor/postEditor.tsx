'use client';

import { useAuth, useBlogPost } from '@/components/hooks';
import { FlexCol } from '@/components/layouts';
import { useEditorInstance } from '@/components/providers';
import {
  Button,
  ClientErrorMessage,
  Input,
  TinyMCEEditor,
} from '@/components/ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateSummary, validateTitle } from '@/utils';
import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH } from '@/utils/constants';

interface PostEditor {
  id?: string;
}

export const PostEditor: React.FC<PostEditor> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const { post, savePost } = useBlogPost(id || '');
  const { editorRef, editorReady } = useEditorInstance();
  const router = useRouter();

  useEffect(() => {
    // Load post body if it exists
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

    // Check input validation
    const titleError = validateTitle(title);
    const summaryError = validateSummary(summary);

    // Show error if any
    if (titleError || summaryError) {
      setError(titleError || summaryError || '');
      return;
    }

    try {
      // If editor is ready, get the content and save it in DB
      if (editorRef.current && editorReady) {
        // Check token for auth
        const token = await user?.getIdToken();
        if (!token) throw new Error('User is not authenticated');

        // Retrieve update content from editor
        const content = editorRef.current.getContent();

        // Save post to DB
        const post = await savePost(title, summary, content, token);
        router.push(`/post/${post}`);
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
            label='Title*'
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
