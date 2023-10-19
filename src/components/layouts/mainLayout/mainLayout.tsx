import { LogoutButton } from '@/components/shared';
import { NewPostButton } from '@/components/shared/newPostButton/newPostButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <>
      <header className='flex items-center gap-4 w-full justify-end p-4'>
        <LogoutButton />
        <NewPostButton />
      </header>
      <main>{props.children}</main>
    </>
  );
};
