import { Wrapper } from '@/components/layouts/wrapper/wrapper';
import { Posts } from './posts';
import { BlogIntro } from './blogIntro';

export const Home = () => {
  return (
    <Wrapper>
      <BlogIntro />
      <Posts />
    </Wrapper>
  );
};
