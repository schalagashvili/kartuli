if (__DEV__) {
  const React = require('react');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: false,

    trackHooks: true,
    logOwnerReasons: true,
    logOnDifferentValues: true,
    collapseGroups: true,

    exclude: [
      /^NavigationContainer/,
      /^Screen$/,
      /^Navigator/,
      /^Tab/,
      /^Stack/,
      /^Drawer/,

      /^Slot$/,
      /^ErrorBoundary/,
      /^ExpoRoot/,
      /^\(.*\)$/, // Exclude route groups like (tabs), (auth)

      /^RCT/,
      /^RN/,
      /^Animated/,
      /^Reanimated/,
      /^FlatList/,
      /^ScrollView/,
    ],
  });
}
