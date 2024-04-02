module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|sass|scss)$": "identity-obj-proxy",
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
  },
};
