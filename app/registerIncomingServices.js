'use strict';

const router = require('express').Router();
const logger = require('app/components/logger')('Init');

router.get('/service-endpoint', (req, res) => {
    logger.info(req.query);
    Object.assign(req.session, req.query);

    res.redirect('/start-page');
});

module.exports = router;
