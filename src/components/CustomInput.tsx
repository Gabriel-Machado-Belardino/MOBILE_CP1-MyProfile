import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

type CustomInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function CustomInput({ label, error, style, ...rest }: CustomInputProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.input,
            color: theme.colors.text,
            borderColor: error ? theme.colors.danger : theme.colors.border,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.placeholder}
        {...rest}
      />

      {!!error && (
        <Text style={[styles.error, { color: theme.colors.danger }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
});
