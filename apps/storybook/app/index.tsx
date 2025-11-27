// Initialize Unistyles BEFORE loading stories
import '@kartuli/ui/src/theme/unistyles';

import { StyleSheet, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Loads generated story imports and the Storybook view instance
import { view } from '../.storybook/storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  // Provide storage implementation per Expo/Storybook guide
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
  },
});

export default function StorybookScreen() {
  return (
    <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
      <StorybookUIRoot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
