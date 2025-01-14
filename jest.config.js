module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Transform .js, .jsx, .ts, .tsx files with babel-jest
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize .jsx files
};
