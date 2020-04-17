'use strict';

const logger = require('app/components/logger')('Init');
const auth = require('app/components/auth');
const registeredServices = require('app/registeredServices');

const formParams = [
    {name: 'serviceId', required: true},
    {name: 'actor', required: true},
    {name: 'pcqId', required: true},
    {name: 'ccdCaseId', required: false},
    {name: 'partyId', required: true}
];

const registerIncomingService = (req, res) => {
    logger.info(req.query);

    const missingRequiredParams = [];

    const form = req.session.form;
    formParams.forEach(param => {
        if (req.query[param.name]) {
            form[param.name] = req.query[param.name];
        } else if (param.required) {
            missingRequiredParams.push(param.name);
        }
    });
    form.channel = req.query.channel ? req.query.channel : 1;

    if (req.query.returnUrl) {
        req.session.returnUrl = req.query.returnUrl;
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
        req.session.validParameters = true;
        // Create the JWT Token after the required parameters have been set.
        auth.createToken(req, req.session.form.partyId);
    }

    res.redirect('/start-page');
};

const validatedService = (serviceId) => {
    return Boolean(serviceId &&
        registeredServices.map(s => s.serviceId.toLowerCase()).includes(serviceId.toLowerCase()));
};

module.exports = registerIncomingService;
