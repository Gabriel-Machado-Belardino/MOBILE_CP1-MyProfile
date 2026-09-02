import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AuthProvider } from './src/hooks/useAuth';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import Routes from './src/routes/Routes';

// Componente interno para conseguir usar o tema na StatusBar
function AppContent() {
  const { themeName } = useTheme();

  return (
    <AuthProvider>
      <StatusBar style={themeName === 'dark' ? 'light' : 'dark'} />
      <Routes />
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
