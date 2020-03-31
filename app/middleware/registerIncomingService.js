'use strict';

const logger = require('app/components/logger')('Init');
const auth = require('app/components/auth');

const formParams = [
    'serviceId',
    'actor',
    'pcqId',
    'ccdCaseId',
    'partyId'
];

const registerIncomingService = (req, res) => {
    logger.info(req.query);

    const form = req.session.form;
    formParams.forEach(param => {
        if (req.query[param]) {
            form[param] = req.query[param];
        } else {
            logger.warn('Missing parameter from incoming service: ' + param);
        }
    });
    form.channel = req.query.channel ? req.query.channel : 1;

    if (req.query.returnUrl) {
        req.session.returnUrl = req.query.returnUrl;
    } else {
        logger.warn('Missing parameter from incoming service: returnUrl');
    }

    // Create the JWT Token after the required parameters have been set.
    auth.createToken(req, {partyId: req.session.form.partyId});

    if (req.query.language) {
        req.session.language = req.query.language;
    }

    res.redirect('/start-page');
};

module.exports = registerIncomingService;
