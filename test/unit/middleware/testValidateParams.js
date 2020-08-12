'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const validateParams = require('app/middleware/validateParams');

describe('validateParams', () => {
    it('should redirect to \'offline\' if params are invalid', (done) => {
        const req = {
            session: {
                validParameters: false
            },
            path: '/start-page'
        };
        const res = {
            redirect: sinon.spy()
        };

        validateParams(req, res);

        expect(res.redirect.calledOnce).to.equal(true);
        expect(res.redirect.calledWith('/offline')).to.equal(true);
        done();
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
