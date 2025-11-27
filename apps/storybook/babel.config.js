const path = require('node:path');

module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: path.resolve(__dirname, '../..'),
          autoProcessImports: ['@kartuli/ui'],
        },
      ],
      // Reanimated MUST stay last
      'react-native-reanimated/plugin',
    ],
  };
};
