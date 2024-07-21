import { Wrapper } from '@/components/layouts';
import { NewPostButton, LogoutButton } from '@/components/shared';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className='p-2 flex justify-between bg-black text-white'>
      <Wrapper>
        <nav className='w-full flex justify-between'>
          <div>
            <Link
              className='hover:underline uppercase text-xs font-bold'
              href='/'
            >
              Home
            </Link>
          </div>
          <div className='flex items-center gap-4 w-full justify-end'>
            <LogoutButton />
            <NewPostButton />
          </div>
        </nav>
      </Wrapper>
    </header>
  );
};
