import { FlexRow, Wrapper } from '@/components/layouts';
import { Posts } from './posts';
import { SmallAbout } from './smallAbout';
import { BlogHeader } from './blogHeader';
import { Navbar } from '@/components/ui';

export const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <BlogHeader />
      </div>
      <Wrapper>
        <div className='flex flex-col lg:flex-row gap-4'>
          <SmallAbout />
          <Posts />
        </div>
      </Wrapper>
    </>
  );
};
