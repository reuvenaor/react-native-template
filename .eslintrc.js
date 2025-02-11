module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message: 'Import AppSafeAreaView from components/hocs instead',
          },
          {
            name: 'react-native-safe-area-context',
            importNames: ['SafeAreaView'],
            message: 'Import AppSafeAreaView from components/hocs instead',
          },
        ],
      },
    ],
  },
};
