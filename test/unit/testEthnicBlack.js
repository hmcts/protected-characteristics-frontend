'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicBackgroundBlack = steps.ApplicantEthnicBackgroundBlack;

describe('ApplicantEthnicBackgroundBlack', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicBackgroundBlack.constructor.getUrl();
            expect(url).to.equal('/black-ethnic-group');
            done();
        });
    });
});
