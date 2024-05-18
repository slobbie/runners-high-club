module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@feature': './src/feature',
          '@common': './src/common',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
        },
      },
    ],
  ],
};
