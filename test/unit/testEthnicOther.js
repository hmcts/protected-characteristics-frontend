'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicBackgroundOther = steps.ApplicantEthnicBackgroundOther;

describe('ApplicantEthnicBackgroundOther', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicBackgroundOther.constructor.getUrl();
            expect(url).to.equal('/other-ethnic-group');
            done();
        });
    });
});
