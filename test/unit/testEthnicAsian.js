'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicBackgroundAsian = steps.ApplicantEthnicBackgroundAsian;

describe('ApplicantEthnicBackgroundAsian', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicBackgroundAsian.constructor.getUrl();
            expect(url).to.equal('/asian-ethnic-group');
            done();
        });
    });
});
