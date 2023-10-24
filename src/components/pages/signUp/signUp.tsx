'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/auth';
import { FlexCol } from '@/components/layouts';
import { Button, ClientErrorMessage, Input } from '@/components/ui';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (password1 === password2) {
      createUserWithEmailAndPassword(auth, email, password1)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`Error ${errorCode}: ${errorMessage}`);
        });
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form className='mt-2 max-w-xs' onSubmit={handleSubmit}>
        <FlexCol>
          <Input
            label='Email'
            id='email'
            type='text'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label='Password'
            className='border border-gray-400 rounded-md'
            id='password'
            type='password'
            onChange={(e) => setPassword1(e.target.value)}
          />

          <Input
            label='Repeat Password'
            className='border border-gray-400 rounded-md'
            id='repeat'
            type='password'
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button type='submit'>Sign up</Button>
        </FlexCol>
      </form>
      {error && <ClientErrorMessage>{error}</ClientErrorMessage>}
    </main>
  );
};

export default Page;
