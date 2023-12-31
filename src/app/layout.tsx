import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { EditorProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Givi - Writer & Director',
  description: 'Welcome to my website!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <EditorProvider>
        <body className={inter.className}>{children}</body>
      </EditorProvider>
    </html>
  );
}
