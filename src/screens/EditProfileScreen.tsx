import React, { useState } from 'react';
import {
  Alert,
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
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { ProfileFormData } from '../types/user';
import { ProfileErrors, validateProfile } from '../utils/validation';

type EditProfileScreenProps = {
  onGoBack: () => void;
};

export default function EditProfileScreen({ onGoBack }: EditProfileScreenProps) {
  const { theme } = useTheme();
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState<ProfileFormData>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    city: user?.city ?? '',
    bio: user?.bio ?? '',
  });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saveError, setSaveError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Loading />;
  }

  function handleChange(field: keyof ProfileFormData, value: string) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  async function handleSave() {
    const validationErrors = validateProfile(form);
    setErrors(validationErrors);
    setSaveError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      await updateProfile(form);
      Alert.alert('Pronto', 'Dados atualizados com sucesso!');
      onGoBack();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Não foi possível salvar as alterações.'
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
          <Text style={[styles.title, { color: theme.colors.text }]}>Editar perfil</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Usuário: {user.username}
          </Text>

          <View
            style={[
              styles.form,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            ]}
          >
            <ErrorMessage message={saveError} />

            <CustomInput
              label="Nome"
              placeholder="Digite seu nome"
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
              error={errors.name}
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
              label="Telefone"
              placeholder="11 99999-9999"
              value={form.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
            />

            <CustomInput
              label="Cidade"
              placeholder="Digite sua cidade"
              value={form.city}
              onChangeText={(value) => handleChange('city', value)}
            />

            <CustomInput
              label="Biografia"
              placeholder="Fale um pouco sobre você"
              value={form.bio}
              onChangeText={(value) => handleChange('bio', value)}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <CustomButton title="Salvar alterações" onPress={handleSave} loading={loading} />
            <CustomButton title="Cancelar" onPress={onGoBack} variant="outline" />
          </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 18,
  },
  form: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
