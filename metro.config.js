const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // It's important to ensure 'browser' is before 'main' so that
    // Metro picks up the browser-specific versions of packages like Axios.
    resolverMainFields: ['react-native', 'browser', 'module', 'main'],
    // You might also need to ensure sourceExts includes 'js', 'json', 'ts', 'tsx'
    // if you're using TypeScript, but the defaults are usually fine.
    // sourceExts: ['js', 'json', 'ts', 'tsx'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
