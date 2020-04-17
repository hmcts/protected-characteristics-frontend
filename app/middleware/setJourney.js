'use strict';

const setJourney = (req, res, next) => {
    const journey = req.session.form ? req.session.form.serviceId || 'DEFAULT' : 'DEFAULT';

    try {
        req.session.journey = require(`app/journeys/${journey.toLowerCase()}`);
    } catch (err) {
        req.session.journey = require('app/journeys/default');
    }

    next();
};

module.exports = setJourney;
