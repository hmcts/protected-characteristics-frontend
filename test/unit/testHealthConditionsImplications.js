'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantHealthConditionsImplications = steps.ApplicantHealthConditionsImplications;

describe('ApplicantHealthConditionsImplications', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantHealthConditionsImplications.constructor.getUrl();
            expect(url).to.equal('/health-conditions-implications');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantHealthConditionsImplications.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'healthConditionsImplications', value: 'optionYesLot', choice: 'Yes'},
                    {key: 'healthConditionsImplications', value: 'optionYesLittle', choice: 'Yes'}
                ]
            });
            done();
        });
    });
});
