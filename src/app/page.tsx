'use client';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCE } from 'tinymce';
import { useRef } from 'react';

export default function Home() {
  const editorRef = useRef<TinyMCE | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className='p-10'>
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
      <button onClick={log}>Log editor content</button>
    </div>
  );
}
