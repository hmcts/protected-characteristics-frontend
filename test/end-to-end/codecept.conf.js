exports.config = {
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:4000',
            show: false
        }
    },
    include: {
        I: './pages/steps_file.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: 'features/*.feature',
        steps: ['./step_definitions/steps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true
        },
        stepByStepReport: {
            enabled: true,
            deleteSuccessful: true,
            ignoreSteps: ['wait*', 'fill*', 'grab*', 'set*', 'click*', 'select*', 'am*'],
            screenshotsForAllureReport: true
        },
        allure: {
            enabled: true,
            // enableScreenshotDiffPlugin: true,
        },
        autoDelay: {
            enabled: true
        }
    },
    tests: './test/*_test.js',
    name: 'pcq-frontend'
};
