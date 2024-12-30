module.exports = {
  testEnvironment: "jest-environment-jsdom", // Ensures the correct environment for DOM testing
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Transform files with Babel
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize these extensions
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Ensure setup file is loaded after Jest environment is ready
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to src/
  },
};
