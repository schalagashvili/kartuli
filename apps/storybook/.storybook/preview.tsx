// Initialize Unistyles before any component renders
import '@kartuli/ui/src/theme/unistyles';

import { View } from 'react-native';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
