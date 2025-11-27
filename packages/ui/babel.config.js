module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@react-native/babel-preset', { useTransformReactJSXExperimental: false }],
    ],
    // Unistyles plugin must run before Reanimated
    plugins: [
      ['react-native-unistyles/plugin', { root: __dirname }],
      'react-native-reanimated/plugin',
    ],
  };
};
