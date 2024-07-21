import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

const font = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Givi - Writer & Director',
  description: 'Givi is a writer and director based in Italy.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
