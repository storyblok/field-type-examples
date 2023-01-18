module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'src/.*\\.test\\.(js|jsx|ts|tsx)$',
  coverageDirectory: 'dist/reports/coverage',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  }
}
