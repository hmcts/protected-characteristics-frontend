const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';

const getBrowserConfig = (browserGroup) => {
    const browserConfig = [];
    for (const candidateBrowser in supportedBrowsers[browserGroup]) {
        if (candidateBrowser) {
            const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
            desiredCapability.tunnelIdentifier = tunnelName;
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
    output: './functional-output',
    timeout: 60000,
    helpers: {
        WebDriverIO: {
            url: process.env.E2E_FRONTEND_URL ||'https://pcq-frontend-staging.service.core-compute-aat.internal',
            browser,
            smartWait: 10000,
            waitforTimeout: 60000,
            cssSelectorsEnabled: 'true',
            windowSize: '1600x900',
            timeouts: {
                script: 60000,
                'page load': 60000,
                implicit: 20000
            },
            'host': 'ondemand.eu-central-1.saucelabs.com',
            'port': 80,
            'region': 'eu',
            'user': 'Douglas.Rice',
            'key': 'b3a35058-1ba1-43a2-97eb-def34e296d34',
            // 'user': process.env.SAUCE_USERNAME,
            // 'key': process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {}
        }
    },
    gherkin: {
        features: 'features/probate.feature',
        steps: ['./step_definitions/probatepcqjourney.js']
    },
    include: {
        'I': './pages/steps.js'
    },
    mocha: {
        reporterOptions: {
            'codeceptjs-cli-reporter': {
                stdout: '-',
                options:
                    {steps: true}
            },
            'mochawesome': {
                stdout: process.env.E2E_CROSSBROWSER_OUTPUT_DIR + 'console.log',
                'options': {
                    'reportDir': process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './output',
                    'reportName': 'index',
                    'reportTitle': 'Crossbrowser results',
                    'inlineAssets': true
                }
            }
        }
    },
    'multiple': {
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
    }
};

exports.config = setupConfig;
