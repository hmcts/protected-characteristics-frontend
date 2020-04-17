'use strict';

const initSteps = require('app/core/initSteps');
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ShutterPage = steps.ShutterPage;
const expect = require('chai').expect;

describe('ShutterPage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ShutterPage.constructor.getUrl();
            expect(url).to.equal('/offline');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the context with the return url', (done) => {
            const req = {
                sessionID: 'some session id',
                session: {
                    returnUrl: 'some-return-url',
                    ctx: {}
                }
            };

            const ctx = ShutterPage.getContextData(req);
            expect(ctx).to.deep.equal({
                sessionID: 'some session id',
                returnUrl: 'some-return-url'
            });
            done();
        });

        it('should return the context when no return url is present', (done) => {
            const req = {
                sessionID: 'some session id',
                session: {
                    ctx: {}
                }
            };

            const ctx = ShutterPage.getContextData(req);
            expect(ctx).to.deep.equal({
                sessionID: 'some session id'
            });
            done();
        });
    });

    describe('action()', () => {
        it('test that context variables are removed and empty object returned', () => {
            let formdata = {};
            let ctx = {
                returnUrl: 'some_url'
            };
            [ctx, formdata] = ShutterPage.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });
    });
});
