const supportedBrowsers = {
    microsoftIE11: {
        ie11: {
            browserName: 'internet explorer',
            name: 'PCQ_WIN10_IE11_11',
            platform: 'Windows 10',
            version: '11.285'
        }
    },
    microsoftEdge: {
        edge: {
            browserName: 'MicrosoftEdge',
            name: 'PCQ_WIN10_EDGE_18',
            platform: 'Windows 10',
            version: '18.17763'
        }
    },
    chrome: {
        chrome_win_latest: {
            browserName: 'chrome',
            name: 'PCQ_WIN10_CHROME_LATEST',
            platform: 'Windows 10',
            version: 'latest'
        },
        chrome_mac_latest: {
            browserName: 'chrome',
            name: 'PCQ_MAC_CHROME_LATEST',
            platform: 'macOS 10.13',
            version: 'latest'
        }
    },
    firefox: {
        firefox_win_latest: {
            browserName: 'firefox',
            name: 'PCQ_WIN10_FIREFOX_LATEST',
            platform: 'Windows 10',
            version: 'latest'
        },
        firefox_mac_latest: {
            browserName: 'firefox',
            name: 'PCQ_MAC_FIREFOX_LATEST',
            platform: 'macOS 10.13',
            version: 'latest'
        },
    },
    safari: {
        safari11: {
            browserName: 'safari',
            name: 'PCQ_MAC_SAFARI_11',
            platform: 'macOS 10.13',
            OS: 'Mac 10.13',
            Browser: 'safari',
            version: '11.1'
        }
    }
};

module.exports = supportedBrowsers;
