'use strict';

const router = require('express').Router();
const registerIncomingService = require('app/middleware/registerIncomingService');

router.get('/service-endpoint', (req, res) => registerIncomingService(req, res));

module.exports = router;
