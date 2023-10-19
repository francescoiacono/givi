import { useResource } from '@/components/hooks';
import { FlexCol, FlexRow } from '@/components/layouts';
import { Button } from '@/components/ui';
import { BlogPost } from '@/types';
import parse from 'html-react-parser';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  const { deleteResource } = useResource();

  return (
    <div className='border-2 border-gray-200 rounded-md px-4 py-3'>
      <FlexRow>
        <Link href={`post/${id}`} className='flex-1'>
          <FlexCol>
            <h3>{title}</h3>
            <div className='flex max-h-8 gap-2 overflow-hidden'>
              <p>{new Date(date).toLocaleDateString()}</p> <span>-</span>{' '}
              <p className='text-ellipsis'>{parse(content)}</p>
            </div>
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
    </div>
  );
};
