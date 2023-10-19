'use client';

import { useAuth } from '@/components/hooks';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export const NewPostButton = () => {
  const router = useRouter();
  const { user } = useAuth();

  return user ? (
    <Button
      onClick={() => {
        router.push('/post/newPost');
      }}
    >
      New Post
    </Button>
  ) : null;
};
