/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // 👇 permite importar desde "hooks/…" o "services/…" sin rutas largas
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
