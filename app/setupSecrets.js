const config = require('@hmcts/properties-volume').addTo(require('config'));
const {get, set} = require('lodash');

const setSecret = (secretPath, configPath) => {
    if (config.has(secretPath)) {
        set(config, configPath, get(config, secretPath));
    }
};

const setupSecrets = () => {
    if (config.has('secrets.pcq')) {
        setSecret('secrets.pcq.frontend-redis-access-key', 'redis.password');
        setSecret('secrets.pcq.jwt-secret', 'auth.jwt.secret');
        setSecret('secrets.pcq.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
        setSecret('secrets.pcq.launchdarkly-key', 'featureToggles.launchDarklyKey');
        // ------------------------------------------ Token Keys ------------------------------------------
        setSecret('secrets.pcq.probate-token-key', 'tokenKeys.probate'); // Probate
        setSecret('secrets.pcq.cmc-token-key', 'tokenKeys.cmc'); // CMC
    }
};

module.exports = setupSecrets;
