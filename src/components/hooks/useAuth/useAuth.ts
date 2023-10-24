import { auth } from '@/firebase/auth';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const getToken = async () => {
    const authToken = await user?.getIdToken();
    if (!authToken) throw new Error('User is not authenticated');
    return authToken;
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      throw new Error(
        'There was an error logging in. Are you using the right email or password?'
      );
    });
  };

  const logOut = () => {
    return signOut(auth).catch((error) => {
      throw new Error('There was an error logging out.');
    });
  };

  return { logIn, logOut, getToken, user };
};
