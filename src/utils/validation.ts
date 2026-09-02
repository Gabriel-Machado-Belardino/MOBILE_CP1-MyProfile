import { Credentials } from '../types/auth';
import { ProfileFormData, RegisterData } from '../types/user';

export type LoginErrors = Partial<Record<keyof Credentials, string>>;
export type RegisterErrors = Partial<Record<keyof RegisterData, string>>;
export type ProfileErrors = Partial<Record<keyof ProfileFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateLogin(credentials: Credentials): LoginErrors {
  const errors: LoginErrors = {};

  if (!credentials.username.trim()) {
    errors.username = 'Informe seu nome de usuário.';
  }

  if (!credentials.password) {
    errors.password = 'Informe sua senha.';
  }

  return errors;
}

export function validateRegister(data: RegisterData): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Informe seu nome.';
  }

  if (!data.username.trim()) {
    errors.username = 'Informe um nome de usuário.';
  }

  if (!data.email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!data.password) {
    errors.password = 'Informe uma senha.';
  } else if (data.password.length < 4) {
    errors.password = 'A senha deve ter no mínimo 4 caracteres.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirme sua senha.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'As senhas não são iguais.';
  }

  return errors;
}

export function validateProfile(data: ProfileFormData): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Informe seu nome.';
  }

  if (!data.email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  return errors;
}
