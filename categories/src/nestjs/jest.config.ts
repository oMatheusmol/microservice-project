export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageProvider: 'v8',
  coverageDirectory: '../__coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@core/api/(.*)$':
      '<rootDir>/../../../node_modules/@core/api/dist/$1',
    '#seedwork/(.*)$':
      '<rootDir>/../../../node_modules/@core/api/dist/@seedwork/$1',
    '#category/(.*)$':
      '<rootDir>/../../../node_modules/@core/api/dist/category/$1',
  },
  setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
