'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantSex = steps.ApplicantSex;

describe('ApplicantSex', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantSex.constructor.getUrl();
            expect(url).to.equal('/sex');
            done();
        });
    });
});
