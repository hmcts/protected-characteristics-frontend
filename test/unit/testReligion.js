'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantReligion = steps.ApplicantReligion;

describe('ApplicantReligion', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantReligion.constructor.getUrl();
            expect(url).to.equal('/religion');
            done();
        });
    });
});
