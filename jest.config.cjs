/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  rootDir: "./",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  injectGlobals: true,
  modulePaths: ["<rootDir>/node_modules"],
};

module.exports = config;
