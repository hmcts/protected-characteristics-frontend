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
                token: '79d3c3968c1b94baa8753a66c72a3382aacb1152f20fac4ba2ad7c754adf464a538a77496a281db63b2caaa49' +
                    '380fcb5f4210a0fc3933a0c4d5f2f790c026df47946c7b8640dc476f47a12822df5c38590dc16c9c9b4143ccca4a' +
                    '76f32aa1bb16a3bd24a0dd30cd31f8ca5f93a46a99ed931f95b20914604b6bddef910b23dbf49f61c2c98c073e0b' +
                    '1f0d4ac2d5b7d05f6cb5cf518eb77c93aaea05970ca3d8f8d571a4983227c0daedbf3ec1ae7666ff490ef8876e73' +
                    'e789ff6db55ae1253444764877a0016b0bb98f6be6a67372c91ae8766a0a411e09cea66fb729a5a089a'
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
                token: '79d3c3968c1b94baa8753a66c72a3382aacb1152f20fac4ba2ad7c754adf464a538a77496a281db63b2caaa49' +
                    '380fcb5f4210a0fc3933a0c4d5f2f790c026df47946c7b8640dc476f47a12822df5c3852a8f925ec2fa8cb56b362' +
                    'e35b8befd90a2cf40805231047c6643faa3abb8a251816a9c1b8755a96430547aa707a0956cef577267298bdd665' +
                    '5131d1cac9d18ba23cdbd2c73ebab4f31c24c52e0c7f32d9f76d230ddcc1f67a54507bd3460d24f'
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
                token: 'f041d695f4114e7338f1a1b2b3e8f8d7340b5bf8a8675f4a3305883a8164c960240de4b5d55d8cfcf4b925b2ddcf' +
                    '76b31ce87b119f2f77a9c9399c33116dcdd29cc58fd866a2c15f25a02f15637b9bf931f72d3b4bb7f726d5e1a4b991b' +
                    'a6cacf0f82c37e228870fb5c4f05aa652bc555c860025e9a616cf2836586fdbc9dd6e948d819b463cea89bcd09f4052' +
                    '539f6b958f29da8ab84bf94233a255ed0efb9ed4d4ba78463b70dad7618505ac4d49909dcd4329b299e6daa52f2394f' +
                    '706fdf0'
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
