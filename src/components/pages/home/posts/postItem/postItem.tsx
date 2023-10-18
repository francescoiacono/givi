import { BlogPost } from '@/types';
import parse from 'html-react-parser';
import Link from 'next/link';

interface PostItemProps {
  blogPost: BlogPost;
}

export const PostItem: React.FC<PostItemProps> = ({ blogPost }) => {
  const { title, date, content, id } = blogPost;

  return (
    <Link href={`posts/${id}}`} className='flex flex-col'>
      <h3>{title}</h3>
      <div className='flex gap-2'>
        <p>{new Date(date).toLocaleDateString()}</p> · <p>{content}</p>
      </div>
    </Link>
  );
};
