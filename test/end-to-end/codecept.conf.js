const CONF = require('config');
exports.config = {
    output: process.cwd()+'/functional-output',
    helpers: {
        Puppeteer: {
            url: CONF.testUrl,
            show: false,
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
                    `--proxy-server=${process.env.E2E_PROXY_SERVER || ''}`,
                    `--proxy-bypass-list=${process.env.E2E_PROXY_BYPASS || ''}`,
                    '--window-size=1440,1400'
                ]
            }
        }
    },
    include: {
        I: 'test/end-to-end/pages/steps.js'
    },
    mocha: {
        reporterOptions: {
            'codeceptjs-cli-reporter': {
                stdout: '-',
                'options': {'steps': true}
            },
            'mocha-junit-reporter': {
                'stdout': '-',
                'options': {'mochaFile': './functional-output/result.xml'}
            },
            mochawesome: {
                'stdout': './functional-output/console.log',
                'options': {
                    'reportDir': './functional-output/mochawesome',
                    'reportName': 'index',
                    'inlineAssets': true
                }
            }
        }
    },
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
