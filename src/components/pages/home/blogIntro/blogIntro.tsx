import { FlexCol } from '@/components/layouts';
import Link from 'next/link';

export const BlogIntro = () => {
  return (
    <FlexCol>
      <h1>{`Gabriele's Blog`}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore deserunt
        recusandae quas, eius provident id nihil!
      </p>
      <Link
        className='font-medium p-2 text-xs border-2 border-gray-200 rounded-md w-20 text-center'
        href='post/newPost'
      >
        New Post
      </Link>
    </FlexCol>
  );
};
