import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';
import ThemeSwitch from '../components/ThemeSwitch';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

type ProfileScreenProps = {
  onGoToEdit: () => void;
};

export default function ProfileScreen({ onGoToEdit }: ProfileScreenProps) {
  const { theme, themeName } = useTheme();
  const { user, signOut } = useAuth();

  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Loading />;
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
      setLoading(false);
    }
  }

  function confirmSignOut() {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: handleSignOut },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.header, borderColor: theme.colors.border }]}>
        <Text style={[styles.greeting, { color: theme.colors.text }]}>
          Olá, {user.name}
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Meu Perfil
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <ProfileCard user={user} />

        <CustomButton title="Editar perfil" onPress={onGoToEdit} />

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Tema atual: {themeName === 'dark' ? 'Dark' : 'Light'}
        </Text>

        <ThemeSwitch />

        <View style={styles.logoutArea}>
          <CustomButton
            title="Sair"
            onPress={confirmSignOut}
            variant="danger"
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 15,
    marginTop: 2,
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 10,
  },
  logoutArea: {
    marginTop: 32,
  },
});
