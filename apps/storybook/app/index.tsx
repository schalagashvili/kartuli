import '@kartuli/ui/src/theme/unistyles';

import { StyleSheet, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { view } from '../.storybook/storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
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
