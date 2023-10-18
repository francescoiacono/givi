'use client';

import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCE } from 'tinymce';
import { useEffect, useRef, useState } from 'react';
import { useResource } from '@/components/hooks';
import { BlogPost } from '@/types';

export const TinyMCEEditor = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { saveResource } = useResource();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const editorRef = useRef<TinyMCE | null>(null);

  const savePost = async () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.getContent();

        const newPost: BlogPost = {
          id: 'popov',
          title: 'popov',
          content: content,
          date: new Date(),
          wordCount: 123,
        };

        await saveResource<BlogPost>('/api/post', newPost);
      }
    } catch (error) {
      // Show user feedback
    }
  };

  return isMounted ? (
    <>
      <Editor
        apiKey={process.env.TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          min_height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
        }}
      />
      <button
        onClick={savePost}
        className='border cursor-pointer border-black px-2 py-1'
      >
        Log editor content
      </button>
    </>
  ) : (
    <p>Loading...</p>
  );
};
