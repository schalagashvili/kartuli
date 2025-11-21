const path = require('path');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          // eslint-disable-next-line no-undef
          root: path.resolve(__dirname, '../..'),
          autoProcessImports: ['@kartuli/ui'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
