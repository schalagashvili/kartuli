import { ConfigContext, ExpoConfig } from '@expo/config';
import { withSentry } from '@sentry/react-native/expo';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.kartuli.ridermobile.dev';
  }

  if (IS_PREVIEW) {
    return 'com.kartuli.ridermobile.preview';
  }

  return 'com.kartuli.ridermobile';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Kartuli (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Kartuli (Preview)';
  }

  return 'Kartuli';
};

export default ({ config }: ConfigContext): ExpoConfig =>
  withSentry(
    {
      ...config,
      name: getAppName(),
      slug: 'kartuli-rider-mobile',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/images/icon.png',
      scheme: 'kartuli-rider-mobile',
      userInterfaceStyle: 'automatic',
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
        bundleIdentifier: getUniqueIdentifier(),
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          backgroundColor: '#E6F4FE',
          foregroundImage: './assets/images/android-icon-foreground.png',
          backgroundImage: './assets/images/android-icon-background.png',
          monochromeImage: './assets/images/android-icon-monochrome.png',
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: getUniqueIdentifier(),
      },
      web: {
        output: 'static',
        favicon: './assets/images/favicon.png',
      },
      plugins: [
        [
          '@sentry/react-native/expo',
          {
            url: 'https://sentry.io/',
            project: 'kartuli-rider-mobile',
            organization: 'wolly',
          },
        ],
        'expo-router',
        [
          'expo-splash-screen',
          {
            image: './assets/images/splash-icon.png',
            imageWidth: 200,
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
            dark: {
              backgroundColor: '#000000',
            },
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
        reactCompiler: true,
      },
      extra: {
        router: {},
        eas: {
          projectId: '7b9fe3fe-5a22-434d-af67-00c4309e0fc8',
        },
      },
      owner: 'schalagashvili2',
    },
    {
      url: 'https://sentry.io/',
      project: 'kartuli-rider-mobile',
      organization: 'wolly',
    }
  );
