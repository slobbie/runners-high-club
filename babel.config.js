module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@features': './src/features',
          '@shared': './src/shared',
          '@navigation': './src/navigation',
          '@utils': './src/common/utils',
        },
      },
    ],
  ],
};
