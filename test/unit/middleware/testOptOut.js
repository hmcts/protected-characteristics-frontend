'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const sinon = require('sinon');
const optOut = require('app/middleware/optOut');

describe('optOut', () => {
    let req = {};

    beforeEach(() => {
        req = {
            session: {
                id: 'ID',
                token: 'TOKEN',
                correlationId: 'CORRELATION_ID',
                form: {
                    pcqAnswers: {
                        dob_provided: 0,
                        language_main: 1,
                        english_language_level: null
                    }
                },
                ctx: {
                    startpage: {},
                    dateofbirth: {dob_provided: 0},
                    language: {language_main: 1, english_language_level: null}
                }
            }
        };
    });

    it('should redirect to the given return URL', (done) => {
        nock('http://localhost:4550')
            .post('/pcq/backend/submitAnswers')
            .reply(
                200,
                {status: ':thumbs_up:'}
            );

        req.session.returnUrl = 'http://test.com';
        const res = {
            redirect: sinon.spy()
        };

        optOut(req, res).then(() => {
            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.args[0][0]).to.equal('http://test.com');
            nock.cleanAll();
            done();
        });
    });

    it('should redirect to the given return URL when backend is down', (done) => {
        nock('http://localhost:4550')
            .post('/pcq/backend/submitAnswers')
            .reply(
                500
            );

        req.session.returnUrl = 'http://test.com';
        const res = {
            redirect: sinon.spy()
        };

        optOut(req, res).then(() => {
            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.args[0][0]).to.equal('http://test.com');
            nock.cleanAll();
            done();
        });
    });

    it('should clear the pcq answers and ctx from the session', (done) => {
        const res = {
            redirect: sinon.spy()
        };

        optOut(req, res).then(() => {
            expect(req.session.form.pcqAnswers).to.deep.equal({});
            expect(req.session.ctx).to.deep.equal({});
            done();
        });
    });
});
