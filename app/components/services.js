'use strict';

const utils = require('app/components/api-utils');
const config = require('app/config');
const submitData = require('app/components/submit-data');
const ORCHESTRATOR_SERVICE_URL = config.services.orchestrator.url;
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

const sendToOrchestratorService = (data, ctx) => {
    logInfo('submitToOrchestratorService', data.applicationId);
    const headers = {
        'Content-Type': 'application/json',
        'Session-Id': ctx.sessionID,
        'Authorization': ctx.authToken,
        'ServiceAuthorization': ctx.serviceAuthToken
    };
    const body = submitData(ctx, data);
    const fetchOptions = utils.fetchOptions(body, 'POST', headers);
    return utils.fetchJson(`${ORCHESTRATOR_SERVICE_URL}/forms/${data.applicationId}/submissions`, fetchOptions);
};

module.exports = {
    sendToOrchestratorService,
    featureToggle
};
