'use client';

import { useEditor } from '@/components/providers';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  className?: string;
  initialValue?: string;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Prevents Quill from being rendered on the server-side

export const QuillEditor = (props: QuillEditorProps) => {
  const { initialValue, className } = props;
  const { value, setValue } = useEditor();

  useEffect(() => {
    console.log('rerendering');
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue, setValue]);

  /**
   * Handles the change event of the Quill editor.
   *`
   * @param content - The new content of the editor.
   * @returns
   */
  const handleChange = (content: string) => {
    setValue(content);
  };

  return (
    <ReactQuill
      className={className || 'h-72 w-full'}
      theme='snow'
      value={value}
      onChange={handleChange}
    />
  );
};
