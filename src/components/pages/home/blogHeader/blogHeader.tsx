import { FlexCol, FlexRow } from '@/components/layouts';
import { IconLink } from '@/components/ui';
import Link from 'next/link';
import { BlogIntro } from './blogIntro';

export const BlogHeader = () => {
  return (
    <FlexCol className='gap-0 mb-10'>
      <FlexRow className='flex items-center'>
        <ul>
          <IconLink
            href='https://twitter.com/'
            src='/assets/icons/twitter/logo.svg'
            alt='Twitter'
            ariaLabel='Visit Twitter Profile'
          />
        </ul>
        <div className='text-center flex-1 max-w-sm mx-auto'>
          <h1 className='text-5xl'>Gabriele Vecchi</h1>
        </div>
        <ul>
          <li className='w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center'>
            <Link href='mailto:test@test.com'>
              <IconLink
                href='mailto:test@test.com'
                src='/assets/icons/common/email.svg'
                alt='Email'
                ariaLabel='Send an Email'
              />
            </Link>
          </li>
        </ul>
      </FlexRow>
      <div className='border-b border-gray-400 my-4 w-3/12 mx-auto'></div>

      <BlogIntro />
    </FlexCol>
  );
};
