'use strict';

const utils = require('app/components/api-utils');
const config = require('app/config');
const FEATURE_TOGGLE_URL = config.featureToggles.url;
const logger = require('app/components/logger');
const logInfo = (message, applicationId = 'Init') => logger(applicationId).info(message);

const featureToggle = (featureToggleKey) => {
    logInfo('featureToggle');
    const url = `${FEATURE_TOGGLE_URL}${config.featureToggles.path}/${featureToggleKey}`;
    const headers = {
        'Content-Type': 'application/json'
    };
    const fetchOptions = utils.fetchOptions({}, 'GET', headers);
    return utils.fetchText(url, fetchOptions);
};

module.exports = {
    featureToggle
};
