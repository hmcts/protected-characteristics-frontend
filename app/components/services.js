'use strict';

const utils = require('app/components/api-utils');
const config = require('app/config');
const submitData = require('app/components/submit-data');
const otp = require('otp');
const ORCHESTRATION_SERVICE_URL = config.services.orchestration.url;
const SERVICE_AUTHORISATION_URL = `${config.services.idam.s2s_url}/lease`;
const serviceName = config.services.idam.service_name;
const secret = config.services.idam.service_key;
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

const sendToOrchestrationService = (data, ctx) => {
    logInfo('submitToOrchestrationService', data.applicationId);
    const headers = {
        'Content-Type': 'application/json',
        'Session-Id': ctx.sessionID,
        'Authorization': ctx.authToken,
        'ServiceAuthorization': ctx.serviceAuthToken
    };
    const body = submitData(ctx, data);
    const fetchOptions = utils.fetchOptions(body, 'POST', headers);
    return utils.fetchJson(`${ORCHESTRATION_SERVICE_URL}/forms/${data.applicationId}/submissions`, fetchOptions);
};

const authorise = (applicationId) => {
    logInfo('authorise for serviceAuthToken called', applicationId);
    const headers = {
        'Content-Type': 'application/json'
    };
    const params = {
        microservice: serviceName,
        oneTimePassword: otp({secret: secret}).totp()
    };
    const fetchOptions = utils.fetchOptions(params, 'POST', headers);
    return utils.fetchText(SERVICE_AUTHORISATION_URL, fetchOptions);
};

module.exports = {
    sendToOrchestrationService,
    authorise,
    featureToggle
};
