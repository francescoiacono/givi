import { FlexCol, FlexRow } from '@/components/layouts';
import { BlogPost } from '@/types';
import { utils } from '@/utils';
import { DeletePostButton, EditPostButton } from '@/components/shared';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, summary, id } = blogPost;

  return (
    <div className='flex w-full items-center border'>
      <div className='flex-1 px-4 py-3'>
        <FlexRow className='justify-between items-center'>
          <Link href={`post/${id}`} className='flex-1 hover:underline'>
            <FlexCol>
              <h3 className='truncate'>{title}</h3>
              <div className='flex max-h-8 gap-2 overflow-hidden'>
                <p>{utils.formateDateShort(date)}</p> <span>•</span>
                <p>{summary}</p>
              </div>
            </FlexCol>
          </Link>
        </FlexRow>
      </div>
      <FlexCol className='items-start p-2 border-l'>
        <EditPostButton id={id} />
        <DeletePostButton id={id} />
      </FlexCol>
    </div>
  );
};
