import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { getTheme, saveTheme } from '../services/storageService';
import { darkTheme } from '../themes/dark';
import { lightTheme } from '../themes/light';
import { Theme, ThemeName } from '../types/theme';

type ThemeContextData = {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const [loading, setLoading] = useState(true);

  // Busca o tema salvo quando o app abre
  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await getTheme();

        if (storedTheme) {
          setThemeName(storedTheme);
        }
      } catch (error) {
        console.log('Não foi possível carregar o tema salvo:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTheme();
  }, []);

  async function toggleTheme() {
    const newTheme: ThemeName = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);

    try {
      await saveTheme(newTheme);
    } catch (error) {
      console.log('Não foi possível salvar o tema:', error);
    }
  }

  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  return useContext(ThemeContext);
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
