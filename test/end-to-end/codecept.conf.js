exports.config = {
    output: process.cwd()+'/functional-output',
    helpers: {
        Puppeteer: {
            url: 'http://pcq-frontend-staging.service.core-compute-aat.internal',
            show: true,
            headless: false,
            chrome: {
                'ignoreHTTPSErrors': true,
                'ignore-certificate-errors': true,
                'defaultViewport': {
                    'width': 1280,
                    'height': 960
                },
                args: [
                    '--no-sandbox',
                    '--proxy-server=proxyout.reform.hmcts.net:8080',
                    '--proxy-bypass-list=*beta*LB.reform.hmcts.net',
                    '--window-size=1440,1400'
                ]
            }
        }
    },
    include: {
        I: 'test/end-to-end/pages/steps.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: 'features/probate.feature',
        steps: ['./step_definitions/probatepcqjourney.js']
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
