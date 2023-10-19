import { FlexCol, MainLayout, Wrapper } from '@/components/layouts';
import { Posts } from './posts';
import { BlogIntro } from './blogIntro';

export const Home = () => {
  return (
    <MainLayout>
      <Wrapper>
        <FlexCol>
          <BlogIntro />
          <Posts />
        </FlexCol>
      </Wrapper>
    </MainLayout>
  );
};
