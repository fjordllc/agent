import type { Config } from "jest";
import nextJest from "next/jest.js";
import dotenv from "dotenv";

dotenv.config({path:".env.test"});

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "mjs",
    "cjs",
    "jsx",
    "json",
    "node",
  ],
  setupFiles:["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/e2e/"],
};

export default createJestConfig(config);
