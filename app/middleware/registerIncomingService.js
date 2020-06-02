'use strict';

const logger = require('app/components/logger')('Init');
const auth = require('app/components/auth');
const stringUtils = require('../components/string-utils');
const registeredServices = require('app/registeredServices');
const {verifyToken} = require('app/components/encryption-token');

const formParams = [
    {name: 'serviceId', required: true},
    {name: 'actor', required: true},
    {name: 'pcqId', required: true},
    {name: 'ccdCaseId', required: false},
    {name: 'partyId', required: true}
];

const handleIncomingParameters = req => {
    const missingRequiredParams = [];

    const form = req.session.form;
    formParams.forEach(param => {
        if (req.query[param.name]) {
            form[param.name] = typeof req.query[param.name] === 'string' ? req.query[param.name].toLowerCase() : req.query[param.name];
        } else if (param.required) {
            missingRequiredParams.push(param.name);
        }
    });
    form.channel = req.query.channel ? req.query.channel : 1;

    if (req.query.returnUrl) {
        req.session.returnUrl = stringUtils.prefixHttps(req.query.returnUrl);
    } else {
        missingRequiredParams.push('returnUrl');
    }
    if (req.query.language) {
        req.session.language = req.query.language;
    }

    if (missingRequiredParams.length > 0) {
        logger.error('Missing required parameters: ' + missingRequiredParams.join(', '));
    } else if (!validatedService(req.query.serviceId)) {
        logger.error(`Service ${req.query.serviceId} is not registered with PCQ`);
    } else {
        logger.info('Parameters verified successfully.');
        req.session.validParameters = true;
        // Create the JWT Token after the required parameters have been set.
        auth.createToken(req, req.session.form.partyId);
    }
};

const validatedService = (serviceId) => {
    return Boolean(serviceId &&
        registeredServices.map(s => s.serviceId.toLowerCase()).includes(serviceId.toLowerCase()));
};

const registerIncomingService = (req, res) => {
    logger.info(req.query);
    if (verifyToken(req.query)) {
        handleIncomingParameters(req);
    }
    res.redirect('/start-page');
};

module.exports = registerIncomingService;
