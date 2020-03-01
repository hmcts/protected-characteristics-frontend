exports.config = {
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:4000',
            show: false
        }
    },
    include: {
        I: './steps_file.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: ['./step_definitions/steps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true
        }
    },
    tests: './test/*_test.js',
    name: 'pcq-frontend'
};
