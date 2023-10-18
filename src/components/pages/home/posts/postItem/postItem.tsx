import { useResource } from '@/components/hooks';
import { FlexCol, FlexRow } from '@/components/layouts';
import { Button } from '@/components/ui';
import { BlogPost } from '@/types';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  const { deleteResource } = useResource();

  return (
    <FlexRow>
      <Link href={`post/${id}`}>
        <FlexCol>
          <h3>{title}</h3>
          <FlexRow>
            <p>{new Date(date).toLocaleDateString()}</p> <span>-</span>{' '}
            <p>{content}</p>
          </FlexRow>
        </FlexCol>
      </Link>
      <Button
        onClick={async () => {
          const res = await deleteResource(`/api/post/${id}`);
          if (res) window.location.reload();
        }}
      >
        Delete
      </Button>
    </FlexRow>
  );
};
