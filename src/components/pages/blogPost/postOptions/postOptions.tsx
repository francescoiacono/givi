import { DeletePostButton, EditPostButton } from '@/components/shared';

interface PostOptionsProps {
  id: string;
}

export const PostOptions: React.FC<PostOptionsProps> = ({ id }) => {
  return (
    <div className='flex-1 flex justify-end items-end'>
      <EditPostButton id={id} />
      <DeletePostButton id={id} />
    </div>
  );
};
