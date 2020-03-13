'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantDisability = steps.ApplicantDisability;

describe('ApplicantDisability', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantDisability.constructor.getUrl();
            expect(url).to.equal('/disability');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantDisability.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'disability', value: '1', choice: 'Yes'}
                ]
            });
            done();
        });
    });
});
