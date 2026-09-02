import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SESSION_STORAGE_KEY,
  THEME_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../constants/storage';
import { Session } from '../types/auth';
import { ThemeName } from '../types/theme';
import { User } from '../types/user';

export async function saveUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.log('Erro ao salvar usuário:', error);
    throw new Error('Não foi possível salvar os dados do usuário.');
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return data ? (JSON.parse(data) as User) : null;
  } catch (error) {
    console.log('Erro ao buscar usuário:', error);
    throw new Error('Não foi possível carregar os dados do usuário.');
  }
}

export async function saveSession(session: Session): Promise<void> {
  try {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.log('Erro ao salvar sessão:', error);
    throw new Error('Não foi possível salvar a sessão.');
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    const data = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    return data ? (JSON.parse(data) as Session) : null;
  } catch (error) {
    console.log('Erro ao buscar sessão:', error);
    throw new Error('Não foi possível carregar a sessão.');
  }
}

export async function removeSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.log('Erro ao remover sessão:', error);
    throw new Error('Não foi possível sair da conta.');
  }
}

export async function saveTheme(theme: ThemeName): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.log('Erro ao salvar tema:', error);
    throw new Error('Não foi possível salvar o tema.');
  }
}

export async function getTheme(): Promise<ThemeName | null> {
  try {
    const data = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (data === 'light' || data === 'dark') {
      return data;
    }
    return null;
  } catch (error) {
    console.log('Erro ao buscar tema:', error);
    throw new Error('Não foi possível carregar o tema.');
  }
}
