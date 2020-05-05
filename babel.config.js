let plugins = [
  [
    'module-resolver',
    {
      root: ['./'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@root': './',
        '@sd': './sd',
        '@src': './src',
        '@images': './assets/images',
        '@sounds': './assets/sounds',
        '@actions': './src/apis/actions',
        '@constants': './src/apis/constants',
        '@reducers': './src/apis/reducers',
        '@components': './src/components',
        '@libs': './src/libs',
        '@apis': './src/apis',
        '@screens': './src/screens',
        '@modal': './src/modal',
      },
      cwd: 'packagejson',
    },
  ],
];
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: plugins,
};
