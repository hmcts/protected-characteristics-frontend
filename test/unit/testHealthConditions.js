'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantHealthConditions = steps.ApplicantHealthConditions;

describe('ApplicantHealthConditions', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantHealthConditions.constructor.getUrl();
            expect(url).to.equal('/health-conditions');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantHealthConditions.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'healthConditions', value: 'optionYes', choice: 'Yes'}
                ]
            });
            done();
        });
    });
});
