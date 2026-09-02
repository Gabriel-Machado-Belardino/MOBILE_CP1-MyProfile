import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { loadLoggedUser, login, logout, registerUser } from '../services/authService';
import { saveUser } from '../services/storageService';
import { Credentials } from '../types/auth';
import { ProfileFormData, RegisterData, User } from '../types/user';

type AuthContextData = {
  user: User | null;
  loadingSession: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfileFormData) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Verifica se já existe uma sessão salva quando o app abre
  useEffect(() => {
    async function loadSession() {
      try {
        const loggedUser = await loadLoggedUser();
        setUser(loggedUser);
      } catch (error) {
        console.log('Não foi possível recuperar a sessão:', error);
        setUser(null);
      } finally {
        setLoadingSession(false);
      }
    }

    loadSession();
  }, []);

  async function signIn(credentials: Credentials) {
    const loggedUser = await login(credentials);
    setUser(loggedUser);
  }

  async function signUp(data: RegisterData) {
    await registerUser(data);
  }

  async function signOut() {
    await logout();
    setUser(null);
  }

  async function updateProfile(data: ProfileFormData) {
    if (!user) {
      return;
    }

    const updatedUser: User = { ...user, ...data };
    await saveUser(updatedUser);

    setUser((previousUser) =>
      previousUser ? { ...previousUser, ...data } : previousUser
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, loadingSession, signIn, signUp, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
