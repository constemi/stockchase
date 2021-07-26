import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^features/(.*)$': '<rootDir>/features/$1',
    '^layouts/(.*)$': '<rootDir>/layouts/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
}

export default config
