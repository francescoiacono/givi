'use client';

import { useAuth } from '@/components/hooks';
import { CenteredLayout } from '@/components/layouts';
import { Button, Input } from '@/components/ui';
import { isValidEmail, isValidPassword } from '@/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AdminLogin = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);

    try {
      await logIn(email, password);
      setLoading(false);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during login.'
      );
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <CenteredLayout>
      <form
        className='flex flex-col gap-4 w-[20rem] rounded-md'
        onSubmit={handleSubmit}
      >
        <h1>Log in</h1>
        <Input
          autoComplete='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className='border rounded-md border-gray-300 p-1'
          id='email'
          type='text'
          withLabel='Email'
        />
        <Input
          value={password}
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded-md border-gray-300 p-1'
          id='password'
          type='password'
          withLabel='Password'
        />
        <Button className='border rounded-md border-gray-300 p-1 mt-4'>
          Log in
        </Button>
      </form>
      {error && <p className='text-red-500 max-w-[20rem] py-4'>{error}</p>}
    </CenteredLayout>
  ) : (
    <p>Loading...</p>
  );
};
