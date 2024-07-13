import { MainLayout } from '@/components/layouts';
import { EditorProvider } from '@/components/providers';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EditorProvider>
      <MainLayout>{children}</MainLayout>
    </EditorProvider>
  );
};

export default Layout;
