module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testSequencer: "./test/CustomSequencer.ts"
}
process.env = Object.assign(process.env, {
    POSTGRES_HOST: 'localhost'
});