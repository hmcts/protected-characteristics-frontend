'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantMaritalStatus = steps.ApplicantMaritalStatus;

describe('ApplicantMaritalStatus', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantMaritalStatus.constructor.getUrl();
            expect(url).to.equal('/marital-status');
            done();
        });
    });
});
