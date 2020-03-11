'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEnglishLevel = steps.ApplicantEnglishLevel;

describe('ApplicantEnglishLevel', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEnglishLevel.constructor.getUrl();
            expect(url).to.equal('/english-level');
            done();
        });
    });
});
