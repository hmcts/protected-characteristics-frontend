'use strict';

const router = require('express').Router();

const validateParams = (req, res, next) => {
    if (!req.session.validParameters && req.path !== '/offline') {
        // To be changed during launchdarkly implementation
        const isFeatureEnabled = false;
        if (isFeatureEnabled) {
            res.redirect('/offline');
        } else {
            next();
        }
    } else {
        next();
    }
};

router.get('*', (req, res, next) => validateParams(req, res, next));

module.exports = router;
