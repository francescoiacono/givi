'use client';

import { useAuth } from '@/components/hooks';
import { Button, ClientErrorMessage } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = () => {
  const { user, logOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      await logOut();
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during log out.'
      );
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <>
      {user ? (
        <>
          <p>
            Hey, <span className='underline'>{user.email}!</span>
          </p>
          <Button variant='secondary' onClick={handleLogout}>
            Log out
          </Button>
        </>
      ) : null}
      {error && <ClientErrorMessage>{error}</ClientErrorMessage>}
    </>
  ) : (
    <p>Loading...</p>
  );
};
