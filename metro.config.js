const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');
const modules = require('./modules.json');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
    platforms: ['ios', 'android', 'native', 'web'],
    resolveRequest: (context, moduleName, platform) => {
      // Only intercept our specific optional modules
      const moduleKeys = [...Object.values(modules.screens)];
      
      if (moduleKeys.includes(moduleName)) {
        try {
          // Try default resolution first
          return context.resolveRequest(context, moduleName, platform);
        } catch (error) {
          // If module not found, return fallback
          return {
            filePath: require.resolve('./src/screens/not-found-screen.tsx'),
            type: 'sourceFile',
          };
        }
      }
      
      // For all other modules, use default Metro resolution
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

const defaultConfig = getDefaultConfig(__dirname);

// Fix for React Native 0.79.5 runtime errors - disable package exports
defaultConfig.resolver.unstable_enablePackageExports = false;

defaultConfig.resolver.assetExts.push('pte');
defaultConfig.resolver.assetExts.push('bin');

module.exports = mergeConfig(defaultConfig, config);
