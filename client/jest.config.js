const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(scss|less)$": "<rootDir>/mocks/styleMocks.js",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
};
