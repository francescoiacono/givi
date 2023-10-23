import { FlexRow } from '@/components/layouts';
import { Posts } from './posts';
import { SmallAbout } from './smallAbout';
import { BlogHeader } from './blogHeader';

export const Home = () => {
  return (
    <>
      <BlogHeader />
      <FlexRow>
        <SmallAbout />
        <Posts />
      </FlexRow>
    </>
  );
};
