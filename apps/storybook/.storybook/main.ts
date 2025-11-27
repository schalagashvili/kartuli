import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: [
    // UI package stories
    '../../../packages/ui/src/**/*.stories.@(ts|tsx)',
    // Local stories if you add any later
    '../components/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

export default main;
