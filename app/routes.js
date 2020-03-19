'use strict';

const config = require('app/config');
const router = require('express').Router();
const initSteps = require('app/core/initSteps');
const logger = require('app/components/logger');
const get = require('lodash').get;
const uuidv4 = require('uuid/v4');
const shutter = require('app/shutter');
const registerIncomingService = require('app/registerIncomingService');
const setJourney = require('app/middleware/setJourney');

router.use(shutter);
router.use(registerIncomingService);
router.use(setJourney);

router.all('*', (req, res, next) => {
    const correlationId = get(req.session, 'correlationId', 'init');
    req.log = logger(correlationId);
    req.log.info(`Processing ${req.method} for ${req.originalUrl}`);
    next();
});

// Initialise session objects
router.use((req, res, next) => {
    if (!req.session.correlationId) {
        req.session.correlationId = uuidv4();
    }
    if (!req.session.ctx) {
        req.session.ctx = {};
    }
    if (!req.session.form) {
        req.session.form = {
            payloadVersion: config.payloadVersion,
            applicationId: uuidv4()
        };
        req.session.back = [];
    }
    next();
});

router.get('/', (req, res) => {
    req.log.info({tags: 'Analytics'}, 'Application Started');
    res.redirect(`${config.app.basePath}/start-page`);
});

router.use((req, res, next) => {
    const steps = initSteps([`${__dirname}/steps/ui`], req.session.language);

    Object.entries(steps).forEach(([, step]) => {
        router.get(step.constructor.getUrl(), step.runner().GET(step));
        router.post(step.constructor.getUrl(), step.runner().POST(step));
    });

    res.locals.session = req.session;
    res.locals.pageUrl = req.url;
    next();
});

router.get('/health/liveness', (req, res) => {
    res.json({status: 'UP'});
});

module.exports = router;
