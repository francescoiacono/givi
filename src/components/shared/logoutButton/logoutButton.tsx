'use client';

import { useAuth } from '@/components/hooks';
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
    <div className='flex items-center gap-4 w-full justify-end p-4'>
      {user ? (
        <>
          <p>Hey, {user.email}! </p>
          <button
            className='p-1 px-4 border border-gray-300 rounded-md'
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <p>User Not Found</p>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};
