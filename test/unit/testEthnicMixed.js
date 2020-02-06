'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicBackgroundMixed = steps.ApplicantEthnicBackgroundMixed;

describe('ApplicantEthnicBackgroundMixed', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicBackgroundMixed.constructor.getUrl();
            expect(url).to.equal('/mixed-ethnic-group');
            done();
        });
    });
});
