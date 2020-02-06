'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicBackgroundWhite = steps.ApplicantEthnicBackgroundWhite;

describe('ApplicantEthnicBackgroundWhite', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicBackgroundWhite.constructor.getUrl();
            expect(url).to.equal('/white-ethnic-group');
            done();
        });
    });
});
