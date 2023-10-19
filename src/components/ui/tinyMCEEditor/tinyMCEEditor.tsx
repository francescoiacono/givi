'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { useEditorInstance } from '@/components/providers';

export const TinyMCEEditor = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setEditorInstance } = useEditorInstance();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted ? (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      onInit={(evt, editor) => setEditorInstance(editor)}
      initialValue=''
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
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
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
  ) : (
    <p>Loading...</p>
  );
};
