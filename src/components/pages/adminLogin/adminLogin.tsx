'use client';

import { useAuth } from '@/components/hooks';
import { CenteredLayout } from '@/components/layouts';
import {
  Button,
  CircularLoading,
  ClientErrorMessage,
  Input
} from '@/components/ui';
import { utils } from '@/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AdminLogin = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    if (!utils.isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!utils.isValidPassword(password)) {
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
          onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
          id='email'
          type='text'
          label='Email'
        />
        <Input
          value={password}
          autoComplete='current-password'
          onChange={e => setPassword(e.target.value)}
          id='password'
          type='password'
          label='Password'
        />
        <Button>Log in</Button>
      </form>
      {error && (
        <ClientErrorMessage className=' max-w-[20rem] py-4'>
          {error}
        </ClientErrorMessage>
      )}
    </CenteredLayout>
  ) : (
    <CircularLoading />
  );
};
