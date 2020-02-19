'use strict';

const config = require('app/config');
const router = require('express').Router();
const initSteps = require('app/core/initSteps');
const logger = require('app/components/logger');
const get = require('lodash').get;
const uuidv4 = require('uuid/v4');
const shutter = require('app/shutter');
const featureToggles = require('app/featureToggles');
const registerIncomingServices = require('app/registerIncomingServices');

router.use(shutter);
router.use(featureToggles);
router.use(registerIncomingServices);

router.all('*', (req, res, next) => {
    const applicationId = get(req.session.form, 'applicationId', 'init');
    req.log = logger(applicationId);
    req.log.info(`Processing ${req.method} for ${req.originalUrl}`);
    next();
});

router.use((req, res, next) => {
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
