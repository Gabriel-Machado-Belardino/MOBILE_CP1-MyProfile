import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { User } from '../types/user';

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  const { theme } = useTheme();

  // Campos opcionais podem estar vazios logo após o cadastro
  const info = [
    { label: 'Nome', value: user.name },
    { label: 'Usuário', value: user.username },
    { label: 'E-mail', value: user.email },
    { label: 'Telefone', value: user.phone },
    { label: 'Cidade', value: user.city },
    { label: 'Biografia', value: user.bio },
  ];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
    >
      {info.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
            {item.label}
          </Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>
            {item.value ? item.value : 'Não informado'}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
  },
});
