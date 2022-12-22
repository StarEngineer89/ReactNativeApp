// const tsconfig = require('./tsconfig.json');
// let rawAlias = tsconfig.compilerOptions.paths;
// let alias = {};

// for (let x in rawAlias) {
//   alias[x.replace('/*', '')] = rawAlias[x].map((p) => p.replace('/*', ''));
// }

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: true,
          allowUndefined: true,
        },
      ],
    ],
  };
};
