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
                    {key: 'disability_impact', value: 1, choice: 'Yes'},
                    {key: 'disability_impact', value: 2, choice: 'Yes'}
                ]
            });
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;
        let formdata;
        const session = {};

        it('should return the required fields set to null if no options are selected', (done) => {
            ctx = {};
            errors = [];
            [ctx, errors] = ApplicantDisabilityImplications.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                'disability_impact': null
            });
            done();
        });
    });
});
