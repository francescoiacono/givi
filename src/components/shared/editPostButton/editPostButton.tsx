'use client';

import { useAuth, useResource } from '@/components/hooks';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface EditPostButtonProps {
  id: string;
}

export const EditPostButton: React.FC<EditPostButtonProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/post/${id}/edit`);
  };

  return user ? (
    <Button secondary onClick={handleEdit}>
      Edit Post
    </Button>
  ) : null;
};
