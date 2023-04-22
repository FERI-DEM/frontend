import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { apiInstance } from '@/api/axios';

const authContext = createContext({} as any);

export function AuthProvider({ children }: any) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{auth.loading ? null : children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext<{
    user: any;
    loading: boolean;
    signUpWithEmail: (email: string, password: string, redirect: string) => any;
    signinWithEmail: (email: string, password: string, redirect: string) => any;
    signinWithGitHub: (redirect: string) => any;
    signinWithGoogle: (redirect: string) => any;
    signinWithMicrosoft: (redirect: string) => any;
    signout: () => any;
    getFreshToken: () => any;
  }>(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: any) => {
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

  const signUpWithEmail = async (email: string, password: string, redirect: string) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password).then((response: any) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    }, onAuthError);
  };

  const signinWithEmail = async (email: string, password: string, redirect: string) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password).then((response: any) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    }, onAuthError);
  };

  const signinWithGitHub = async (redirect: string) => {
    setLoading(true);
    return await signInWithPopup(auth, new GithubAuthProvider()).then((response: any) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    }, onAuthError);
  };

  const signinWithGoogle = async (redirect: string) => {
    setLoading(true);
    return await signInWithPopup(auth, new GoogleAuthProvider()).then((response: any) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    }, onAuthError);
  };

  const signinWithMicrosoft = async (redirect: string) => {
    setLoading(true);
    return await signInWithPopup(auth, new OAuthProvider('microsoft.com')).then((response: any) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    }, onAuthError);
  };

  const signout = async () => {
    return await signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  const getFreshToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(false);
      return `${token}`;
    } else {
      return '';
    }
  };

  const onAuthError = (error: any) => {
    setLoading(false);
    Router.push('/auth/login');
  };

  return {
    user,
    loading,
    signUpWithEmail,
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signinWithMicrosoft,
    signout,
    getFreshToken,
  };
}

const formatUser = async (user: any) => {
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
  const { token, expirationTime } = decodedToken;
  apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
