'use strict';
const featureToggle = new (require('app/utils/FeatureToggle'))();
const logger = require('app/components/logger');

const getBaseJourney = name => {
    return require(`app/journeys/${name.toLowerCase()}`);
};

const setJourney = async (req, res) => {
    const journeyName = req.session.form ? req.session.form.serviceId || 'DEFAULT' : 'DEFAULT';

    try {
        const journey = getBaseJourney(journeyName);

        if (journey.skipListFt) {
            journey.skipList = await processSkipListFt(journey.skipListFt, req, res);
        }

        req.session.journey = journey;
    } catch (err) {
        req.session.journey = require('app/journeys/default');
    }

    return req.session.journey;
};

const processSkipListFt = (skipListFt, req, res) => {
    const promises = skipListFt.map(sl => featureToggle.checkTogglePromise(sl.ftKey, req, res));
    return Promise.all(promises)
        .then(values => {
            const processedList = [];
            skipListFt.forEach((sl, i) => {
                if (values[i] === true) {
                    processedList.push(sl.step);
                }
            });
            return processedList;
        })
        .catch(() => {
            logger(req.session.sessionId).error('ERROR retrieving skip list toggles; defaulting all to skip');

            /*
             * If there was an error retrieving the toggles, we skip all questions that have toggles in order to prevent
             * a question from being erroneously shown to a user.
             */
            return skipListFt.map(sl => sl.step);
        });
};

module.exports = setJourney;
