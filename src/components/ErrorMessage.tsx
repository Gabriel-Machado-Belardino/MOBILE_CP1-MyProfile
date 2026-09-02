import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const { theme } = useTheme();

  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, { borderColor: theme.colors.danger }]}>
      <Text style={[styles.text, { color: theme.colors.danger }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
