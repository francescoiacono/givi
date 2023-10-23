import { FlexCol, FlexRow } from '@/components/layouts';
import { BlogPost } from '@/types';
import { formateDateShort, stripHtmlTags } from '@/utils';
import { DeletePostButton } from './deletePostButton';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  return (
    <div className='flex w-full'>
      <div className='border-2 flex-1 border-gray-200 rounded-md px-4 py-3'>
        <FlexRow className='justify-between items-center'>
          <Link href={`post/${id}`} className='flex-1'>
            <FlexCol>
              <h3 className='truncate'>{title}</h3>
              <div className='flex max-h-8 gap-2 overflow-hidden'>
                <p>{formateDateShort(date)}</p> <span>-</span>
                <p className='truncate max-w-md overflow-hidden'>
                  {stripHtmlTags(content)}
                </p>
              </div>
            </FlexCol>
          </Link>
        </FlexRow>
      </div>
      <DeletePostButton id={id} />
    </div>
  );
};
