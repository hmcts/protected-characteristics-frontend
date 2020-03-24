/* eslint-disable no-console */
const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';

const getBrowserConfig = (browserGroup) => {
    const browserConfig = [];
    for (const candidateBrowser in supportedBrowsers[browserGroup]) {
        if (candidateBrowser) {
            const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
            desiredCapability.tunnelIdentifier = tunnelName;
            desiredCapability.acceptSslCerts = 'true';
            desiredCapability.acceptInsecureCerts = 'true';
            desiredCapability.tags = ['pcq'];
            browserConfig.push({
                browser: desiredCapability.browserName,
                desiredCapabilities: desiredCapability
            });
        } else {
            console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
        }
    }
    return browserConfig;
};

const setupConfig = {
    output: process.cwd() + '/functional-output',
    helpers: {
        WebDriver: {
            url: process.env.E2E_FRONTEND_URL ||'https://pcq-frontend-staging.service.core-compute-aat.internal',
            browser: 'chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', '--allow-running-insecure-content'],
            waitforTimeout: 60000,
            ignoreHTTPSErrors: true,
            cssSelectorsEnabled: true,
            windowSize: '1600x900',
            host: 'ondemand.eu-central-1.saucelabs.com',
            port: 80,
            region: 'eu',
            user: process.env.SAUCE_USERNAME || 'username',
            key: process.env.SAUCE_ACCESS_KEY || 'privatekey',
            desiredCapabilities: {}
        },
        SauceLabsReportingHelper: {require: './helpers/SauceLabsReportingHelper.js'},
        JSWait: {require: './helpers/JSWait.js'}
    },
    gherkin: {
        features: 'features/probate.feature',
        steps: ['./step_definitions/probatepcqjourney.js']
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
            'mocha-junit-reporter': {
                stdout: '-',
                options: {mochaFile: '/functional-output/result.xml'}
            },
            mochawesome: {
                stdout: './functional-output/console.log',
                options: {
                    reportDir: './functional-output',
                    reportName: 'index',
                    inlineAssets: true
                }
            }
        }
    },
    multiple: {
        microsoftIE11: {
            browsers: getBrowserConfig('microsoftIE11')
        },
        microsoftEdge: {
            browsers: getBrowserConfig('microsoftEdge')
        },
        chrome: {
            browsers: getBrowserConfig('chrome')
        },
        firefox: {
            browsers: getBrowserConfig('firefox')
        }
    },
    name: 'Pcq Frontend Tests'
};
exports.config = setupConfig;
