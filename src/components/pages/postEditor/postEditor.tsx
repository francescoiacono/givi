'use client';

import { useAuth, useBlogPost } from '@/components/hooks';
import { FlexCol } from '@/components/layouts';
import {
  Button,
  CircularLoading,
  ClientErrorMessage,
  Input,
  QuillEditor
} from '@/components/ui';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { utils } from '@/utils';
import { MAX_SUMMARY_LENGTH, MAX_TITLE_LENGTH } from '@/utils/constants';
import { useEditor } from '@/components/providers';

interface PostEditor {
  id?: string;
}

export const PostEditor: React.FC<PostEditor> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const { post, savePost, loading } = useBlogPost(id || '');
  const { value } = useEditor();
  const router = useRouter();

  /**
   * Loads the post body into the editor.
   * If a post is provided, it sets the title, summary, and content of the editor.
   * If the editor is ready, it updates the state with the post data.
   * If an error occurs, it sets the error state with the error message.
   */
  const loadPostBody = useCallback(() => {
    try {
      if (post) {
        const { title, summary, content } = post;
        setTitle(title);
        setSummary(summary);
        setEditorContent(content);
      }
    } catch (error) {
      setError(error as Error['message']);
    }
  }, [post]);

  /**
   * Submits the post form.
   *
   * @param e - The form event.
   */
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check input validation
    const titleError = utils.validateTitle(title);
    const summaryError = utils.validateSummary(summary);

    // Show error if any
    if (titleError || summaryError) {
      setError(titleError || summaryError || '');
      return;
    }

    try {
      // Retrieve update content from editor
      const content = value;
      // Save post to DB
      const post = await savePost(title, summary, content);
      router.push(`/post/${post}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Load post body when the post is ready
  useEffect(() => {
    loadPostBody();
  }, [post, loadPostBody]);

  // Show loading message

  return user && !loading ? (
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
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            type='text'
            placeholder='A summary of your post'
            id='summary'
            label='Summary'
            value={summary}
            maxLength={MAX_SUMMARY_LENGTH}
            onChange={e => setSummary(e.target.value)}
          />
          <QuillEditor initialValue={editorContent || ''} />
          <Button className='mt-12' type='submit'>
            Save Post
          </Button>
        </FlexCol>
      </form>
    </main>
  ) : (
    <CircularLoading />
  );
};
