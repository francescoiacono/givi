'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { useEditorInstance } from '@/components/providers';
import { config } from './tinyMCEconfig';

interface TinyMCEEditorProps {
  initialValue?: string;
}

export const TinyMCEEditor: React.FC<TinyMCEEditorProps> = props => {
  const [isMounted, setIsMounted] = useState(false);
  const { setEditorInstance } = useEditorInstance();
  const { initialValue } = props;

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
      initialValue={initialValue ? initialValue : ''}
      init={config}
    />
  ) : (
    <p>Loading...</p>
  );
};
