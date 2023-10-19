'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/auth';

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
    <div className=' w-60 py-8 m-auto'>
      <h1>Sign Up</h1>
      <form className='flex flex-col max-w-xs' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          className='border border-gray-400 rounded-md'
          id='email'
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
          className='border border-gray-400 rounded-md'
          id='password'
          type='password'
          onChange={(e) => setPassword1(e.target.value)}
        />

        <label htmlFor='repeat'>Repeat password</label>
        <input
          className='border border-gray-400 rounded-md'
          id='repeat'
          type='password'
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button className='border border-gray-400 rounded-md mt-4'>
          Sign up
        </button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default Page;
