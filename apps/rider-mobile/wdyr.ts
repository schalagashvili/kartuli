import React from 'react';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: false,

    trackHooks: true,
    trackExtraReRenders: true,
    logOwnerReasons: true,
    logOnDifferentValues: true,
    collapseGroups: true,

    exclude: [
      // React Navigation
      /^NavigationContainer/,
      /^Screen$/,
      /^Navigator/,
      /^Tab/,
      /^Stack/,
      /^Drawer/,

      // Expo Router
      /^Slot$/,
      /^ErrorBoundary/,
      /^ExpoRoot/,
      /^\(.*\)$/, // Exclude route groups like (tabs), (auth)

      // React Native internals
      /^RCT/,
      /^RN/,
      /^Animated/,
      /^Reanimated/,
      /^FlatList/,
      /^ScrollView/,
    ],
  });
}
