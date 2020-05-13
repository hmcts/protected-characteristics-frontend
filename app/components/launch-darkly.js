'use strict';

const config = require('config');
const launchDarkly = require('launchdarkly-node-server-sdk');

class LaunchDarkly {
    constructor(options, ftValue) {
        this.client = launchDarkly.init(config.featureToggles.launchDarklyKey, options);
        this.ftValue = ftValue;
    }

    close() {
        this.client.close();
    }
}

class Singleton {
    constructor(options = {}, ftValue = false) {
        if (!Singleton.instance) {
            Singleton.instance = new LaunchDarkly(options, ftValue);
        }
    }

    getInstance() {
        return Singleton.instance;
    }

    close() {
        Singleton.instance.close();
        Singleton.instance = null;
    }
}

module.exports = Singleton;
