import { FlexCol, FlexRow } from '@/components/layouts';
import { BlogPost } from '@/types';
import parse from 'html-react-parser';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  return (
    <Link href={`post/${id}`}>
      <FlexCol>
        <h3>{title}</h3>
        <FlexRow>
          <p>{new Date(date).toLocaleDateString()}</p> <span>-</span>{' '}
          <p>{content}</p>
        </FlexRow>
      </FlexCol>
    </Link>
  );
};
