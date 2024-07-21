import { Wrapper } from '@/components/layouts';
import { EditorProvider } from '@/components/providers';
import { Navbar } from '@/components/ui';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EditorProvider>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </EditorProvider>
  );
};

export default Layout;
