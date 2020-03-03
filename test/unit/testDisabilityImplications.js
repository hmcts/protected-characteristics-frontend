'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantDisabilityImplications = steps.ApplicantDisabilityImplications;

describe('ApplicantDisabilityImplications', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantDisabilityImplications.constructor.getUrl();
            expect(url).to.equal('/disability-implications');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantDisabilityImplications.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'disabilityImplications', value: 'optionYesLot', choice: 'Yes'},
                    {key: 'disabilityImplications', value: 'optionYesLittle', choice: 'Yes'}
                ]
            });
            done();
        });
    });
});