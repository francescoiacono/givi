import { NewPost } from '@/components/pages';

const Page = ({ params }: { params: { id: string } }) => {
  return <NewPost postId={params.id} />;
};

export default Page;
