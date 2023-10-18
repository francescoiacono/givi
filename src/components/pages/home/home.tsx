import { FlexCol, Wrapper } from '@/components/layouts';
import { Posts } from './posts';
import { BlogIntro } from './blogIntro';

export const Home = () => {
  return (
    <Wrapper>
      <FlexCol>
        <BlogIntro />
        <Posts />
      </FlexCol>
    </Wrapper>
  );
};
