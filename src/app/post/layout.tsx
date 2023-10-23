import { MainLayout } from '@/components/layouts';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
