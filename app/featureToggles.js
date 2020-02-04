'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.all('*', (req, res, next) => featureToggle.callCheckToggle(req, res, next, 'pc_welsh_ft', featureToggle.toggleFeature));

module.exports = router;
