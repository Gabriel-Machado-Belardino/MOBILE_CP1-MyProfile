import React, { useState } from 'react';

import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

type AuthScreen = 'login' | 'register';
type AppScreen = 'profile' | 'edit';

export default function Routes() {
  const { user, loadingSession } = useAuth();

  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [appScreen, setAppScreen] = useState<AppScreen>('profile');
  const [message, setMessage] = useState('');

  if (loadingSession) {
    return <Loading message="Verificando sessão..." />;
  }

  if (!user) {
    if (authScreen === 'register') {
      return (
        <RegisterScreen
          onGoToLogin={(successMessage) => {
            setMessage(successMessage ?? '');
            setAuthScreen('login');
          }}
        />
      );
    }

    return (
      <LoginScreen
        successMessage={message}
        onGoToRegister={() => {
          setMessage('');
          setAuthScreen('register');
        }}
      />
    );
  }

  if (appScreen === 'edit') {
    return <EditProfileScreen onGoBack={() => setAppScreen('profile')} />;
  }

  return <ProfileScreen onGoToEdit={() => setAppScreen('edit')} />;
}
