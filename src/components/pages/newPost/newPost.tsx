import { Wrapper } from '@/components/layouts';
import { NewPostEditor } from './newPostEditor/newPostEditor';

interface NewPostProps {
  postId?: string;
}

export const NewPost: React.FC<NewPostProps> = ({ postId }) => {
  return (
    <Wrapper>
      <NewPostEditor id={postId} />
    </Wrapper>
  );
};
