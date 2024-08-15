const config = {
    verbose: true,
    testPathIgnorePatterns: [
        './node_modules/',
        './build/'
    ],
    testMatch: [
        '**/__tests__/index.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
};

module.exports = config