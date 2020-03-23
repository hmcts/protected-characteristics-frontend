'use strict';

const setJourney = (req, res, next) => {
    const journey = req.session.form ? req.session.form.serviceId || 'DEFAULT' : 'DEFAULT';

    req.session.journey = require(`app/journeys/${journey.toLowerCase()}`);
    next();
};

module.exports = setJourney;
