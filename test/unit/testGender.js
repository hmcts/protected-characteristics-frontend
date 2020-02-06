'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantGenderSameAsSex = steps.ApplicantGenderSameAsSex;

describe('ApplicantGenderSameAsSex', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantGenderSameAsSex.constructor.getUrl();
            expect(url).to.equal('/gender-same-as-sex');
            done();
        });
    });
});
