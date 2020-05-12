'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const config = require('config');
const registerIncomingService = require('app/middleware/registerIncomingService');

describe('registerIncomingService', () => {
    it('should assign valid incoming query params to the session and redirect to the start page', (done) => {
        const req = {
            query: {
                serviceId: 'PROBATE',
                actor: 'APPLICANT',
                pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
                ccdCaseId: 1234567890123456,
                partyId: 'applicant@email.com',
                returnUrl: 'invoking-service-return-url/',
                language: 'en',
                channel: 2,
                token: '35c2d8724dd2660d503314e9e641bfec60450b184eaf5ec42703f8cc0a8981e156400899e8923bb878b4b62c64' +
                    '17de175468ce6e7aab65af57b7ec70139ffe48983550ed3a59e5b0a5b0038327a3c0e142d1d5a429ec97243306af0' +
                    '38236bf833b544011d7ee38f405c4c9f006bdbb40383fed91dbea3cc668b4c494a9a009e6e669c29e29a6afe79c95' +
                    'bf2a5367ed0e361ebefbe2ec0f09f122387cdfac4f26e6ef828c704ff0c77e6a47e77269318732daaf8f050eded0e' +
                    'df86ed7faddc6a6b5c78c109e3a9cdfefd022987e2a859004836663af9d45c7f5ebf525013228e9'
            },
            session: {
                form: {}
            }
        };
        const res = {
            redirect: sinon.spy()
        };

        registerIncomingService(req, res);

        expect(req.session).to.deep.equal({
            returnUrl: 'https://invoking-service-return-url/',
            language: 'en',
            form: {
                serviceId: 'probate',
                actor: 'applicant',
                pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
                ccdCaseId: 1234567890123456,
                partyId: 'applicant@email.com',
                channel: 2
            },
            token: req.session.token,
            validParameters: true
        });
        expect(res.redirect.calledOnce).to.equal(true);
        expect(res.redirect.calledWith('/start-page')).to.equal(true);

        done();
    });

    it('should assign default params to the session when none passed and redirect to the start page', (done) => {
        const req = {
            query: {},
            session: {
                form: {}
            }
        };
        const res = {
            redirect: sinon.spy()
        };

        registerIncomingService(req, res);

        expect(req.session).to.deep.equal({
            form: {}
        });
        expect(res.redirect.calledOnce).to.equal(true);
        expect(res.redirect.calledWith('/start-page')).to.equal(true);

        done();
    });

    it('should assign a valid JWT token to the session', (done) => {
        const req = {
            query: {
                serviceId: 'PROBATE',
                actor: 'APPLICANT',
                pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
                partyId: 'applicant@email.com',
                returnUrl: 'invoking-service-return-url/',
                token: '35c2d8724dd2660d503314e9e641bfec60450b184eaf5ec42703f8cc0a8981e156400899e8923bb878b4b62c6417' +
                    'de175468ce6e7aab65af57b7ec70139ffe48983550ed3a59e5b0a5b0038327a3c0e1c543da6e0da50a716781b61faf0' +
                    '49a97bf238f80990cb923917b3c0c29ba1f7e802dd00d9d24fcbceb913332827863ebb07e5e3ce28120afab3d492494' +
                    'ee93297da5fe8dea2f262a5a5b8af95520f143464289569a95d5dd2da55b8da0869c73'
            },
            session: {
                form: {}
            }
        };
        const res = {
            redirect: sinon.spy()
        };

        registerIncomingService(req, res);

        const validToken = jwt.verify(req.session.token, config.auth.jwt.secret, (err) => {
            return !err;
        });

        expect(validToken).to.equal(true);

        done();
    });

    it('should not create a token or validate the service if its not registered', (done) => {
        const req = {
            query: {
                serviceId: 'NOTREGISTERED',
                actor: 'APPLICANT',
                pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f',
                partyId: 'applicant@email.com',
                returnUrl: 'http://invoking-service-return-url/',
                token: '13008eff475abb48ecf18b9e6ea316fa61a0c371f95ff75977cc92093397d765e3b124d4d058f1345e812f76d4ff' +
                    '47d4e1a0949da0aacfb2721247aa4fd380729777ebfbb2f068af034189cd6b22f7368c002444e1c8c8f4d7d436aa339' +
                    'b9cb034e551917d27e9ef6008a0930c29f6baecadcb61baf46409eadbbc274b0fdca322fc3bcd6e96848c8a75495e74' +
                    '5d83152b9fed597839d4caf52bdfa3ec2491d801d53af860e749ce313f89858fc908848acc9328e643d89b613cbf3b6' +
                    '2056a44'
            },
            session: {
                form: {}
            }
        };
        const res = {
            redirect: sinon.spy()
        };

        registerIncomingService(req, res);

        expect(req.session).to.not.have.property('token');
        expect(req.session).to.not.have.property('validParameters');

        done();
    });
});
