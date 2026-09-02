import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitch() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>Light</Text>

      <Switch
        value={themeName === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={theme.colors.primary}
        trackColor={{ false: theme.colors.border, true: theme.colors.border }}
      />

      <Text style={[styles.text, { color: theme.colors.text }]}>Dark</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    gap: 12,
  },
  text: {
    fontSize: 15,
  },
});
