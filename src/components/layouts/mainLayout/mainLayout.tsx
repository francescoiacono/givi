import { Navbar } from '@/components/ui';
import { Wrapper } from '..';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = props => {
  return (
    <Wrapper>
      <Navbar />
      <main>{props.children}</main>
    </Wrapper>
  );
};
