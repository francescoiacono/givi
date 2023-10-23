import { NewPostButton, LogoutButton } from '@/components/shared';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header>
      <nav className='pb-8 flex justify-between'>
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
    </header>
  );
};
