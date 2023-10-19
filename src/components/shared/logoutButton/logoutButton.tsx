'use client';

import { useAuth } from '@/components/hooks';
import { Button } from '@/components/ui';
import { useState } from 'react';

export const LogoutButton = () => {
  const { user, logOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      await logOut();
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
          <p>Hey, {user.email}! </p>
          <Button onClick={handleLogout}>Log out</Button>
        </>
      ) : null}
      {error && <p className='text-red-500'>{error}</p>}
    </>
  ) : (
    <p>Loading...</p>
  );
};
