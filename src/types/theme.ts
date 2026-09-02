export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  card: string;
  header: string;
  text: string;
  textSecondary: string;
  border: string;
  input: string;
  placeholder: string;
  primary: string;
  primaryText: string;
  danger: string;
  success: string;
};

export type Theme = {
  name: ThemeName;
  colors: ThemeColors;
};
