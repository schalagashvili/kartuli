const React = require('react');

// Mock all lucide-react-native icons as simple React elements
const createMockIcon = (name) => {
  const MockIcon = () => React.createElement('View', { testID: `${name}-icon` });
  MockIcon.displayName = name;
  return MockIcon;
};

module.exports = {
  Home: createMockIcon('Home'),
  Settings: createMockIcon('Settings'),
  User: createMockIcon('User'),
  Check: createMockIcon('Check'),
  X: createMockIcon('X'),
  ChevronRight: createMockIcon('ChevronRight'),
  ChevronLeft: createMockIcon('ChevronLeft'),
};
