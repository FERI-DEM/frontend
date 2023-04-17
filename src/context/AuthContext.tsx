import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

const authContext = createContext({} as any);

export function AuthProvider({ children }: any) {
  const auth = useFirebaseAuth();
  return (
    <authContext.Provider value={auth}>
      {auth.loading ? null : children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext<{
    user: any;
    loading: boolean;
    signUpWithEmail: (email: string, password: string, redirect: string) => any;
    signinWithEmail: (email: string, password: string, redirect: string) => any;
    signinWithGitHub: (redirect: string) => any;
    signinWithGoogle: (redirect: string) => any;
    signout: () => any;
    getFreshToken: () => any;
  }>(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: any) => {
    console.log('handleUser called', new Date());
    if (rawUser) {
      const user: any = await formatUser(rawUser);

      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    redirect: string
  ) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (response: any) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      }
    );
  };

  const signinWithEmail = async (
    email: string,
    password: string,
    redirect: string
  ) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password).then(
      (response: any) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      }
    );
  };

  const signinWithGitHub = async (redirect: string) => {
    setLoading(true);
    return await signInWithPopup(auth, new GithubAuthProvider()).then(
      (response: any) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      }
    );
  };

  const signinWithGoogle = async (redirect: string) => {
    setLoading(true);
    return await signInWithPopup(auth, new GoogleAuthProvider()).then(
      (response: any) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      }
    );
  };

  const signout = async () => {
    return await signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  const getFreshToken = async () => {
    console.log('getFreshToken called', new Date());
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(false);
      return `${token}`;
    } else {
      return '';
    }
  };

  return {
    user,
    loading,
    signUpWithEmail,
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signout,
    getFreshToken,
  };
}

const formatUser = async (user: any) => {
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
  const { token, expirationTime } = decodedToken;
  console.log(token);
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
    expirationTime,
  };
};
