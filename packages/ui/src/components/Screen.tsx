import { type ReactNode } from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { lightTheme } from '../theme';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export function Screen({
  children,
  style,
  backgroundColor = lightTheme.colors.background,
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
