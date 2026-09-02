import { Credentials, Session } from '../types/auth';
import { RegisterData, User } from '../types/user';
import {
  getSession,
  getUser,
  removeSession,
  saveSession,
  saveUser,
} from './storageService';

export async function registerUser(data: RegisterData): Promise<User> {
  const newUser: User = {
    id: String(Date.now()),
    username: data.username.trim().toLowerCase(),
    password: data.password,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: '',
    city: '',
    bio: '',
  };

  await saveUser(newUser);
  return newUser;
}

export async function login(credentials: Credentials): Promise<User> {
  const user = await getUser();

  if (!user) {
    throw new Error('Nenhum usuário cadastrado. Faça seu cadastro primeiro.');
  }

  const username = credentials.username.trim().toLowerCase();

  if (user.username !== username || user.password !== credentials.password) {
    throw new Error('Usuário ou senha incorretos.');
  }

  const session: Session = {
    username: user.username,
    loggedAt: new Date().toISOString(),
  };

  await saveSession(session);
  return user;
}

export async function logout(): Promise<void> {
  await removeSession();
}

export async function loadLoggedUser(): Promise<User | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await getUser();

  if (!user || user.username !== session.username) {
    return null;
  }

  return user;
}
