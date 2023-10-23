import { useAuth, useResource } from '@/components/hooks';
import { FlexCol, FlexRow } from '@/components/layouts';
import { BlogPost } from '@/types';
import { stripHtmlTags } from '@/utils';
import Link from 'next/link';
import { DeletePostButton } from './deletePostButton';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;
  const { user } = useAuth();

  const { deleteResource } = useResource();

  return (
    <div className='flex w-full'>
      <div className='border-2 flex-1 border-gray-200 rounded-md px-4 py-3'>
        <FlexRow>
          <Link href={`post/${id}`} className='flex-1'>
            <FlexCol>
              <h3>{title}</h3>
              <div className='flex max-h-8 gap-2 overflow-hidden'>
                <p>{new Date(date).toLocaleDateString()}</p> <span>-</span>{' '}
                <p className='text-ellipsis'>{stripHtmlTags(content)}</p>
              </div>
            </FlexCol>
          </Link>
        </FlexRow>
      </div>
      <DeletePostButton id={id} />
    </div>
  );
};
