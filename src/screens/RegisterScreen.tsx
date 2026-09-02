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
import { RegisterData } from '../types/user';
import { RegisterErrors, validateRegister } from '../utils/validation';

type RegisterScreenProps = {
  onGoToLogin: (message?: string) => void;
};

const INITIAL_FORM: RegisterData = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterScreen({ onGoToLogin }: RegisterScreenProps) {
  const { theme } = useTheme();
  const { signUp } = useAuth();

  const [form, setForm] = useState<RegisterData>(INITIAL_FORM);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  // Atualiza apenas o campo alterado (imutabilidade)
  function handleChange(field: keyof RegisterData, value: string) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  async function handleRegister() {
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    setRegisterError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      await signUp(form);
      setForm(INITIAL_FORM);
      onGoToLogin('Cadastro realizado com sucesso! Faça o login.');
    } catch (error) {
      setRegisterError(
        error instanceof Error ? error.message : 'Não foi possível cadastrar.'
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
          <Text style={[styles.title, { color: theme.colors.text }]}>Criar conta</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Preencha os dados abaixo para se cadastrar.
          </Text>

          <View
            style={[
              styles.form,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            ]}
          >
            <ErrorMessage message={registerError} />

            <CustomInput
              label="Nome"
              placeholder="Digite seu nome"
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
              error={errors.name}
            />

            <CustomInput
              label="Nome de usuário"
              placeholder="Digite um nome de usuário"
              value={form.username}
              onChangeText={(value) => handleChange('username', value)}
              autoCapitalize="none"
              error={errors.username}
            />

            <CustomInput
              label="E-mail"
              placeholder="exemplo@email.com"
              value={form.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <CustomInput
              label="Senha"
              placeholder="Digite uma senha"
              value={form.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry
              error={errors.password}
            />

            <CustomInput
              label="Confirmação de senha"
              placeholder="Digite a senha novamente"
              value={form.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry
              error={errors.confirmPassword}
            />

            <CustomButton title="Cadastrar" onPress={handleRegister} loading={loading} />
          </View>

          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Já tem cadastro?
          </Text>

          <CustomButton title="Entrar" onPress={() => onGoToLogin()} variant="outline" />
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
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
