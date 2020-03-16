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

    describe('handlePost()', () => {
        let ctx;
        let errors;
        let formdata;
        const session = {};

        it('should set the ethnicity_other field to null when not selected', (done) => {
            ctx = {
                'ethnicity': '9',
                'ethnicity_other': 'To be set to null'
            };
            errors = [];
            [ctx, errors] = ApplicantEthnicBackgroundAsian.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                ethnicity: '9',
                ethnicity_other: null
            });
            done();
        });
    });
});
