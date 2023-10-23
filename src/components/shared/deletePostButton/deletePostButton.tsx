'use client';

import { useAuth, useResource } from '@/components/hooks';
import { Button } from '@/components/ui';

interface DeletePostButtonProps {
  id: string;
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const { user } = useAuth();
  const { deleteResource } = useResource();

  const handleDelete = async () => {
    if (!user) return;

    const confirmation = confirm('Are you sure you want to delete this post?');
    if (!confirmation) return;

    const token = await user.getIdToken();
    const res = await deleteResource(`/api/post/${id}`, token);
    if (res) window.location.reload();
  };

  return user ? (
    <Button secondary onClick={handleDelete} className='text-sm'>
      Delete
    </Button>
  ) : null;
};
