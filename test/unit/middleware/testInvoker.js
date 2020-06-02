'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const app = require('app');
const request = require('supertest');
const invoker = rewire('app/middleware/invoker');

describe('Invoker', () => {
    describe('formFiller()', () => {
        it('should fill specified fields', (done) => {
            const formFiller = invoker.__get__('formFiller');
            const req = {
                query: {
                    service: 'SERVICE',
                    actor: 'ACTOR',
                    fields: 'serviceId,partyId,language'
                }
            };
            const res = {
                json: sinon.spy()
            };

            formFiller(req, res);
            const resJson = res.json.args[0][0];

            expect(resJson.serviceId).to.equal('SERVICE');
            expect(resJson.partyId).to.equal('SERVICE_ACTOR@test.gov.uk');
            expect(resJson.language).to.equal('en');

            done();
        });
    });

    describe('postForm()', () => {
        it('should redirect to the service endpoint with the correct params', (done) => {
            const postForm = invoker.__get__('postForm');
            const req = {
                body: {
                    serviceId: 'a',
                    actor: 'b',
                    pcqId: 'c',
                    ccdCaseId: 'd',
                    partyId: 'e',
                    returnUrl: 'f',
                    language: 'g',
                    _csrf: 'h',
                }
            };
            const res = {
                redirect: sinon.spy()
            };

            postForm(req, res);
            const redirectUrl = res.redirect.args[0][0];
            expect(redirectUrl).to.equal('/service-endpoint?serviceId=a&actor=b&pcqId=c&ccdCaseId=d&partyId=e&returnUrl=f&language=g');

            done();
        });
    });

    describe('Routing', () => {
        it('should load the invoker page', (done) => {
            const server = app.init(false, {}, {ft_invoker: true});
            const agent = request.agent(server.app);
            agent.get('/invoker')
                .expect(200)
                .end((err, res) => {
                    server.http.close();
                    if (err) {
                        throw err;
                    }
                    expect(res.text).to.contain('PCQ Invoker');
                    done();
                });
        });

        it('should redirect when invoker feature is off', (done) => {
            const server = app.init(false, {}, {ft_invoker: false});
            const agent = request.agent(server.app);
            agent.get('/invoker')
                .expect(302)
                .end((err, res) => {
                    server.http.close();
                    if (err) {
                        throw err;
                    }
                    expect(res.header.location).to.equal('404');
                    done();
                });
        });

        it('should not load in prod environment', (done) => {
            const rewiredApp = rewire('app');
            rewiredApp.__set__('config.environment', 'prod');
            const server = rewiredApp.init(false, {}, {ft_invoker: true});
            const agent = request.agent(server.app);
            agent.get('/invoker')
                .expect(404)
                .end((err, res) => {
                    server.http.close();
                    if (err) {
                        throw err;
                    }
                    expect(res.text).to.contain('Page not found');
                    done();
                });
        });
    });
});
