'use client';

import { createContext, useContext, useState } from 'react';

interface EditorProvider {
  children: React.ReactNode;
}

interface EditorContext {
  value: string;
  setValue: (value: string) => void;
}

export const EditorContext = createContext<EditorContext | undefined>(
  undefined
);

export const EditorProvider: React.FC<EditorProvider> = ({ children }) => {
  const [value, setValue] = useState('');

  return (
    <EditorContext.Provider value={{ value, setValue }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
