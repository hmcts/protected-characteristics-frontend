'use strict';

const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

const validateParams = (req, res, next) => {
    if (!req.session.validParameters && req.path !== '/offline') {
        featureToggle.callCheckToggle(req, res, next, res.locals.launchDarkly, 'ft_enforce_params', featureToggle.toggleExistingPage, 'offline');
    } else {
        next();
    }
};

module.exports = validateParams;
