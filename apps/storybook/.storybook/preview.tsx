// Initialize Unistyles before any component renders
import '@kartuli/ui/src/theme/unistyles';

import { View } from 'react-native';

const preview = {
  decorators: [
    (Story: React.FC) => (
      <View>
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
