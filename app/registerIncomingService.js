'use strict';

const router = require('express').Router();
const registerIncomingService = require('app/middleware/registerIncomingService');
const initSession = require('app/middleware/initSession');

router.get('/service-endpoint', (req, res) => {
    // Reset the session on registering a new incoming service
    req.session.regenerate(() => {
        initSession(req, res);
        registerIncomingService(req, res);
    });
});

module.exports = router;
