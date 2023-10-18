import { BlogPost } from '@/components/pages';

const Page = ({ params }: { params: { id: string } }) => {
  return <BlogPost postId={params.id} />;
};

export default Page;
