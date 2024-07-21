import { FlexCol, FlexRow, Wrapper } from '@/components/layouts';
import { IconLink } from '@/components/ui';
import { BlogIntro } from './blogIntro';

export const BlogHeader = () => {
  return (
    <FlexCol className='gap-0 py-8 mb-12 bg-black text-white'>
      <Wrapper>
        <FlexRow>
          <div className='flex-1'>
            <h1 className='text-5xl'>Givi</h1>
          </div>
          <ul className='flex'>
            <li>
              <IconLink
                href='https://twitter.com/'
                src='/assets/icons/twitter/logo.svg'
                alt='Twitter'
                ariaLabel='Visit Twitter Profile'
                openInNewTab
              />
            </li>
            <li>
              <IconLink
                href='mailto:test@test.com'
                src='/assets/icons/common/email.svg'
                alt='Email'
                ariaLabel='Send an Email'
              />
            </li>
          </ul>
        </FlexRow>
        <BlogIntro />
      </Wrapper>
    </FlexCol>
  );
};
