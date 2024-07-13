import { FlexCol, FlexRow } from '@/components/layouts';
import { IconLink } from '@/components/ui';
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
            openInNewTab
          />
        </ul>
        <div className='text-center flex-1 max-w-sm mx-auto'>
          <h1 className='text-5xl'>Givi</h1>
        </div>
        <ul>
          <IconLink
            href='mailto:test@test.com'
            src='/assets/icons/common/email.svg'
            alt='Email'
            ariaLabel='Send an Email'
          />
        </ul>
      </FlexRow>
      <div className='border-b border-gray-400 w-3/12 mt-2 mb-6 mx-auto'></div>

      <BlogIntro />
    </FlexCol>
  );
};
