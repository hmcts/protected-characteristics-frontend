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
                    {key: 'disability_conditions', value: 1, choice: 'Yes'}
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
            [ctx, errors] = ApplicantDisability.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                'disability_conditions': null
            });
            done();
        });
    });
});
