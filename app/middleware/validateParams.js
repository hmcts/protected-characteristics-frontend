'use strict';

const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

const pathWhitelist = [
    '/offline',
    // Invoker
    '/invoker', '/invoker/formFiller', '/invoker/genToken',
    // Static Pages
    '/cookies', '/privacy-policy', '/accessibility-statement', '/terms-conditions'
];

const validateParams = (req, res, next) => {
    if (req.session.validParameters || pathWhitelist.includes(req.path)) {
        next();
    } else {
        featureToggle.callCheckToggle(req, res, next, 'ft_enforce_params', featureToggle.toggleExistingPage, 'offline');
    }
};

module.exports = validateParams;
