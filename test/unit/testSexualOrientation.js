'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantSexualOrientation = steps.ApplicantSexualOrientation;

describe('ApplicantSexualOrientation', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantSexualOrientation.constructor.getUrl();
            expect(url).to.equal('/sexual-orientation');
            done();
        });
    });
});
