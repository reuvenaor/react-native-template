module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // react-native-reanimated/plugin has to be listed last.
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
