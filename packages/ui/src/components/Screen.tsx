import React, { type ReactNode } from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { theme } from '../theme';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export function Screen({
  children,
  style,
  backgroundColor = theme.colors.background,
}: ScreenProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
