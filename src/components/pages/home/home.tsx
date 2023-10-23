import { FlexCol, FlexRow, MainLayout, Wrapper } from '@/components/layouts';
import { Posts } from './posts';
import { BlogIntro } from './blogIntro';
import { Header } from './header';
import { SmallAbout } from './smallAbout';

export const Home = () => {
  return (
    <MainLayout>
      <Wrapper>
        <Header />
        <FlexRow>
          <SmallAbout />
          <FlexCol>
            <BlogIntro />
            <Posts />
          </FlexCol>
        </FlexRow>
      </Wrapper>
    </MainLayout>
  );
};
