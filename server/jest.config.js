// jest.config.js

module.exports = {
    // Other Jest configurations...
    preset: 'ts-jest',
    testEnvironment: 'node',
    // For setup file to be executed before each test file
    setupFiles: ['./jest.setup.js'],

};
