'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const registerIncomingService = require('app/middleware/registerIncomingService');

describe('registerIncomingService', () => {
    it('should assign incoming query params to the session and redirect to the start page', (done) => {
        const req = {
            query: {
                serviceId: 'INVOKING_SERVICE_ID',
                actor: 'CITIZEN',
                pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
                ccdCaseId: 1234567890123456,
                partyId: 'applicant@email.com',
                returnUrl: 'http://invoking-service-return-url/',
                language: 'en'
            },
            session: {}
        };
        const res = {
            redirect: sinon.spy()
        };

        registerIncomingService(req, res);

        expect(req.session).to.deep.equal({
            serviceId: 'INVOKING_SERVICE_ID',
            actor: 'CITIZEN',
            pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
            ccdCaseId: 1234567890123456,
            partyId: 'applicant@email.com',
            returnUrl: 'http://invoking-service-return-url/',
            language: 'en'
        });
        expect(res.redirect.calledOnce).to.equal(true);
        expect(res.redirect.calledWith('/start-page')).to.equal(true);

        done();
    });
});
