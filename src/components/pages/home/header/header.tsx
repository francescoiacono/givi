import { FlexRow } from '@/components/layouts';
import Link from 'next/link';

export const Header = () => {
  return (
    <FlexRow className='flex items-center mb-10'>
      <div>
        <ul>
          <li className='w-16 h-16 border border-gray-600 rounded-full flex items-center justify-center'>
            <Link href='https://twitter.com/'>Twitter</Link>
          </li>
        </ul>
      </div>
      <div className='text-center flex-1 max-w-sm m-auto'>
        <h1 className='text-5xl'>Gabriele Vecchi</h1>
        <div className='border-b border-gray-600 mt-4 w-6/12 mx-auto'></div>
      </div>
      <div>
        <ul>
          <li className='w-16 h-16 border border-gray-600 rounded-full flex items-center justify-center'>
            <Link href='mailto:test@test.com'>Email</Link>
          </li>
        </ul>
      </div>
    </FlexRow>
  );
};
