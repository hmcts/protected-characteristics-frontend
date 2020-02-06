'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantPregnant = steps.ApplicantPregnant;

describe('ApplicantPregnant', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantPregnant.constructor.getUrl();
            expect(url).to.equal('/pregnant');
            done();
        });
    });
});
