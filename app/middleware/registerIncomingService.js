'use strict';

const logger = require('app/components/logger')('Init');

const registerIncomingService = (req, res) => {
    logger.info(req.query);
    Object.assign(req.session, req.query);

    res.redirect('/start-page');
};

module.exports = registerIncomingService;
