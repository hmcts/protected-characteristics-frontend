'use strict';

const expect = require('chai').expect;
const config = require('config');
const sinon = require('sinon');
const validateParams = require('app/middleware/validateParams');

describe('validateParams', () => {
    it('should redirect to \'offline\' if params are invalid and enforce params is enabled', (done) => {
        const LaunchDarkly = require('launchdarkly-node-server-sdk');
        const ldClient = LaunchDarkly.init(config.featureToggles.launchDarklyKey, {offline: true});

        const req = {
            session: {
                validParameters: false
            },
            path: '/start-page'
        };
        const res = {
            locals: {
                launchDarkly: {
                    client: ldClient,
                    ftValue: {ft_enforce_params: true}
                }
            },
            redirect: sinon.spy()
        };

        validateParams(req, res);

        setTimeout(() => {
            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.calledWith('offline')).to.equal(true);
            done();
        }, 100);

    });

    it('should call next() on valid parameters', (done) => {
        const req = {
            session: {
                validParameters: true
            },
            path: '/start-page'
        };
        const res = {};
        const next = sinon.spy();

        validateParams(req, res, next);

        setTimeout(() => {
            expect(next.calledOnce).to.equal(true);
            done();
        }, 100);

    });
});
