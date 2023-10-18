'use client';

import {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Editor as TinyMCE } from 'tinymce';

interface EditorProviderProps {
  children: React.ReactNode;
}

interface EditorContextProps {
  editorRef: MutableRefObject<TinyMCE | null>;
  setEditorInstance: (editor: TinyMCE) => void;
  editorReady: boolean;
}

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [editor, setEditor] = useState<TinyMCE | null>(null);
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const editorRef = useRef<TinyMCE | null>(null);

  useEffect(() => {
    editorRef.current = editor;
    setEditorReady(editor !== null);
  }, [editor]);

  const setEditorInstance = (editor: TinyMCE) => {
    setEditor(editor);
  };

  return (
    <EditorContext.Provider
      value={{ editorRef, editorReady, setEditorInstance }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorInstance = (): EditorContextProps => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditorInstance must be used within an EditorProvider');
  }

  return context;
};
