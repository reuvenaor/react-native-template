const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('pte')
defaultConfig.resolver.assetExts.push('bin')

module.exports = mergeConfig(defaultConfig, config);
