import * as ReactNativeTestingLibrary from '@testing-library/react-native';
import { configure } from 'reassure';

if (typeof global.performance === 'undefined') {
  global.performance = {};
}

if (typeof global.performance.now === 'undefined') {
  const startTime = Date.now();
  global.performance.now = function () {
    return Date.now() - startTime;
  };
}

configure({ testingLibrary: ReactNativeTestingLibrary });
