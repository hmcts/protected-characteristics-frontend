'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantProvideDateOfBirth = steps.ApplicantProvideDateOfBirth;

describe('ApplicantProvideDateOfBirth', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantProvideDateOfBirth.constructor.getUrl();
            expect(url).to.equal('/provide-date-of-birth');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantProvideDateOfBirth.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'provideDateOfBirth', value: 'optionYes', choice: 'Yes'}
                ]
            });
            done();
        });
    });
});
