const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');
const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';
const setupConfig = {
    output: './functional-output',
    timeout: 60000,
    helpers: {
        WebDriver: {
            url: 'https://pcq-frontend-staging.service.core-compute-aat.internal',
            browser: 'chrome',
            cssSelectorsEnabled: true,
            host: 'ondemand.eu-central-1.saucelabs.com',
            port: 80,
            region: 'eu',
            user: process.env.SAUCE_USERNAME,
            key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: getDesiredCapabilities(),
            waitforTimeout: 60000
        }
    },
    gerkin: {
        features: 'features/probate.feature',
        steps: ['./step_definitions/probatepcqjourney.js']
    },
    include: {
        I: 'test/end-to-end/pages/steps.js'
    },
    mocha: {
        reporterOptions: {
            reportDir: './functional-output',
            reportName: browser + '_report',
            reportTitle: 'Crossbrowser results for: ' + browser.toUpperCase(),
            inlineAssets: true
        }
    },
};

function getDesiredCapabilities() {
    const desiredCapability = supportedBrowsers[browser];
    desiredCapability.tunnelIdentifier = tunnelName;
    desiredCapability.acceptSslCerts = true;
    // eslint-disable-next-line no-lone-blocks
    {
        // eslint-disable-next-line no-undef
        args = ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', '--allow-running-insecure-content'];
    }
    return desiredCapability;
}

exports.config = setupConfig;
