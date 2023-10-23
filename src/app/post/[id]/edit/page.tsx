import { PostEditor } from '@/components/pages';

const Page = ({ params }: { params: { id: string } }) => {
  return <PostEditor id={params.id} />;
};

export default Page;
