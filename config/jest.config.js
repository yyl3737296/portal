module.exports = {
    cacheDirectory: '.jest-cache',
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ],
    coverageDirectory: '.jest-coverage',
    coveragePathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/dist/', '<rootDir>/packages/(?:.+?)/build/'],
    coverageReporters: ['html', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    rootDir: "../",
    setupFiles: [
        "react-app-polyfill/jsdom"
    ],
    setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
    testMatch: [
        "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    testPathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/dist/', '<rootDir>/packages/(?:.+?)/build/'],
    // transform: { "^.+\\.[t|j]sx?$": ['babel-jest', { rootMode: "upward" }] },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ['babel-jest', { rootMode: "upward" }],
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    }
};
