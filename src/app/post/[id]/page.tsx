import { BlogPost } from '@/components/pages';
import 'react-quill/dist/quill.core.css';

const Page = ({ params }: { params: { id: string } }) => {
  return <BlogPost postId={params.id} />;
};

export default Page;
