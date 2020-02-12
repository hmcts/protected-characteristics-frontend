'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const StartPage = steps.StartPage;

describe('StartPage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = StartPage.constructor.getUrl();
            expect(url).to.equal('/start-page');
            done();
        });
    });

    describe('action()', () => {
        it('test that context variables are removed and empty object returned', () => {
            let formdata = {};
            let ctx = {
                returnUrl: 'some_url'
            };
            [ctx, formdata] = StartPage.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });
    });
});
