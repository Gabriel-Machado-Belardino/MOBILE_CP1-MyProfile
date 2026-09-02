export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
};

// Dados preenchidos no formulário de cadastro
export type RegisterData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Dados preenchidos no formulário de edição do perfil
export type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
};
