'use client';

import { useAuth, useResource } from '@/components/hooks';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface DeletePostButtonProps {
  id: string;
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const { user } = useAuth();
  const { deleteResource } = useResource();
  const router = useRouter();

  const handleDelete = async () => {
    if (!user) return;

    const confirmation = confirm('Are you sure you want to delete this post?');
    if (!confirmation) return;

    try {
      const token = await user.getIdToken();
      await deleteResource(`/api/posts/${id}`, token);
      router.push('/');
    } catch (error) {
      throw new Error(error as Error['message']);
    }
  };

  return user ? (
    <Button variant='secondary' onClick={handleDelete} className='text-sm'>
      Delete
    </Button>
  ) : null;
};
