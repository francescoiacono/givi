'use client';

import { useEditor } from '@/components/providers';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  className?: string;
  initialValue?: string;
}

export const QuillEditor = (props: QuillEditorProps) => {
  const { initialValue, className } = props;
  const { value, setValue } = useEditor();

  useEffect(() => {
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
