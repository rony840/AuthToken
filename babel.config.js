module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    'react-native-reanimated/plugin'
  ],
};
