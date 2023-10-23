import { FlexCol, FlexRow } from '@/components/layouts';
import { DeletePostButton, EditPostButton } from '@/components/shared';
import { BlogPost } from '@/types';
import { formateDateShort, stripHtmlTags } from '@/utils';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  return (
    <div className='flex w-full items-center'>
      <div className='flex-1 px-4 py-3'>
        <FlexRow className='justify-between items-center'>
          <Link href={`post/${id}`} className='flex-1 hover:underline'>
            <FlexCol>
              <h3 className='truncate'>{title}</h3>
              <div className='flex max-h-8 gap-2 overflow-hidden'>
                <p>{formateDateShort(date)}</p> <span>•</span>
                <p className='truncate max-w-xl overflow-hidden'>
                  {stripHtmlTags(content)}
                </p>
              </div>
            </FlexCol>
          </Link>
        </FlexRow>
      </div>
      <div>
        <EditPostButton id={id} />
        <DeletePostButton id={id} />
      </div>
    </div>
  );
};
