module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|immer|react-redux|react-native-reanimated|react-native-worklets|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|@shopify/react-native-skia|@shopify/flash-list)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
