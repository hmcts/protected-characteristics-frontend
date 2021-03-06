const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

// eslint-disable-next-line no-unused-vars
const browser = process.env.SAUCELABS_BROWSER;
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';
const getBrowserConfig = (browserGroup) => {
    const browserConfig = [];
    for (const candidateBrowser in supportedBrowsers[browserGroup]) {
        if (candidateBrowser) {
            const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
            desiredCapability.tunnelIdentifier = tunnelName;
            desiredCapability.acceptSslCerts = true;
            desiredCapability.tags = ['pcq-frontend'];
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
    output: `${process.cwd()}/functional-output`,
    helpers: {
        WebDriverIO: {
            url: process.env.TEST_URL || 'https://pcq.aat.platform.hmcts.net',
            browser,
            cssSelectorsEnabled: 'true',
            host: 'ondemand.eu-central-1.saucelabs.com',
            port: 80,
            region: 'eu',
            sauceConnect: true,
            services: ['sauce'],
            user: process.env.SAUCE_USERNAME,
            key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                'sauce:options': {
                    name: 'CodeceptJS e2e test'
                }
            }
        },
        SauceLabsReportingHelper: {
            require: './helpers/SauceLabsReportingHelper.js'
        },
    },
    gherkin: {
        features: 'features/crossbrowser.feature',
        steps: ['./step_definitions/probatepcqjourney.js']
    },
    include: {
        'I': './pages/steps.js'
    },
    plugins: {
        autoDelay: {
            enabled: true,
            delayAfter: 2000
        }
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
                    'reportDir': process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './functional-output',
                    'reportName': 'index',
                    'reportTitle': 'Crossbrowser results',
                    'inlineAssets': true
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
        },
        safari: {
            browsers: getBrowserConfig('safari')
        }
    }
};

exports.config = setupConfig;
