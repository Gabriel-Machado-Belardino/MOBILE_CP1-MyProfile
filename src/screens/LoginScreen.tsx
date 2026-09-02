import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { LoginErrors, validateLogin } from '../utils/validation';

type LoginScreenProps = {
  onGoToRegister: () => void;
  successMessage?: string;
};

export default function LoginScreen({ onGoToRegister, successMessage }: LoginScreenProps) {
  const { theme } = useTheme();
  const { signIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const validationErrors = validateLogin({ username, password });
    setErrors(validationErrors);
    setLoginError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      await signIn({ username, password });
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : 'Não foi possível fazer o login.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: theme.colors.text }]}>MyProfile</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Já tem cadastro? Entre com seus dados.
          </Text>

          {!!successMessage && (
            <Text style={[styles.success, { color: theme.colors.success }]}>
              {successMessage}
            </Text>
          )}

          <View
            style={[
              styles.form,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            ]}
          >
            <ErrorMessage message={loginError} />

            <CustomInput
              label="Nome de usuário"
              placeholder="Digite seu usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              error={errors.username}
            />

            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <CustomButton title="Entrar" onPress={handleLogin} loading={loading} />
          </View>

          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Ainda não tem cadastro?
          </Text>

          <CustomButton title="Cadastrar" onPress={onGoToRegister} variant="outline" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  success: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  form: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
});
