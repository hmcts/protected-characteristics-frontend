'use strict';

const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

const urlWhitelist = [
    '/offline',
    '/info'
];

const validateParams = (req, res, next) => {
    if (req.session.validParameters || urlWhitelist.includes(req.path)) {
        next();
    } else {
        featureToggle.callCheckToggle(req, res, next, res.locals.launchDarkly, 'ft_enforce_params', featureToggle.toggleExistingPage, 'offline');
    }
};

module.exports = validateParams;
