exports.config = {
    output: process.cwd()+'/functional-output',
    helpers: {
        Puppeteer: {
            url: 'https://pcq-frontend-staging.service.core-compute-aat.internal',
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
    mocha: {
        reporterOptions: {
            'codeceptjs-cli-reporter': {
                stdout: '-',
                options: {steps: true}
            },
            mochawesome: {
                stdout: './functional-output/console.log',
                options: {
                    // eslint-disable-next-line no-undef
                    reportDir: './mochawesome-report',
                    reportName: 'index',
                    inlineAssets: true
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
