'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
const setJourney = rewire('app/middleware/setJourney');
const defaultJourney = require('app/journeys/default');
const probateJourney = require('app/journeys/probate');
const testJourney = require('test/data/journeys/test');

describe('setJourney', () => {
    it('should set req.journey with the default journey when no form session', async () => {
        const req = {
            session: {}
        };
        const res = {};

        await setJourney(req, res);

        expect(req.session).to.deep.equal({
            journey: defaultJourney
        });
    });

    it('should set req.journey with the default journey when no service id', async () => {
        const req = {
            session: {form: {}}
        };
        const res = {};

        await setJourney(req, res);

        expect(req.session).to.deep.equal({
            journey: defaultJourney,
            form: {}
        });
    });

    it('should set req.journey with the probate journey when serviceId is PROBATE', async () => {
        const req = {
            session: {
                form: {
                    serviceId: 'PROBATE'
                }
            }
        };
        const res = {};

        await setJourney(req, res);

        expect(req.session).to.deep.equal({
            form: {
                serviceId: 'PROBATE',
            },
            journey: probateJourney
        });
    });

    it('should set req.journey with default journey when journey file not found', async () => {
        const req = {
            session: {
                form: {
                    serviceId: 'NO_JOURNEY_FILE_FOR_ME'
                }
            }
        };
        const res = {};

        await setJourney(req, res);

        expect(req.session).to.deep.equal({
            form: {
                serviceId: 'NO_JOURNEY_FILE_FOR_ME',
            },
            journey: defaultJourney
        });
    });

    it('should set req.journey with processed skip list', async () => {
        const req = {
            session: {
                form: {
                    serviceId: 'TEST'
                }
            }
        };
        const res = {
            locals: {
                launchDarkly: {
                    ftValue: {
                        ft_enabled: true,
                        ft_disabled: false
                    }
                }
            },
        };

        setJourney.__set__('getBaseJourney', () => {
            return require('test/data/journeys/test');
        });

        await setJourney(req, res);

        const skipList = [
            'ApplicantLanguage',
            'ApplicantSexualOrientation'
        ];

        const journey = Object.assign({}, testJourney);
        journey.skipList = skipList;

        expect(req.session).to.deep.equal({
            form: {
                serviceId: 'TEST',
            },
            journey: journey
        });
    });
});
