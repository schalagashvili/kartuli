const path = require('path');

module.exports = function babelConfig(api) {
  api.cache(true);

  const plugins = [
    [
      'react-native-unistyles/plugin',
      {
        root: path.resolve(__dirname, '../..'),
        autoProcessImports: ['@kartuli/ui'],
      },
    ],
    'react-native-reanimated/plugin',
  ];

  if (plugins[plugins.length - 1] !== 'react-native-reanimated/plugin') {
    throw new Error(
      'Babel config error: `react-native-reanimated/plugin` must be the last plugin in the array.'
    );
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
