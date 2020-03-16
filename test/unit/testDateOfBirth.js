'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantDateOfBirth = steps.ApplicantDateOfBirth;
const content = require('app/resources/en/translation/dateofbirth');

describe('ApplicantDateOfBirth', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantDateOfBirth.constructor.getUrl();
            expect(url).to.equal('/date-of-birth');
            done();
        });
    });

    describe('dateName()', () => {
        it('should return the date names array', (done) => {
            const dateName = ApplicantDateOfBirth.dateName();
            expect(dateName).to.deep.equal(['dob']);
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;
        let formdata;
        const session = {};

        it('should return the ctx with the deceased dob', (done) => {
            ctx = {
                'dob_provided': '1',
                'dob-day': '02',
                'dob-month': '03',
                'dob-year': '1952'
            };
            errors = [];
            [ctx, errors] = ApplicantDateOfBirth.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                'dob_provided': '1',
                'dob-day': '02',
                'dob-month': '03',
                'dob-year': '1952'
            });
            done();
        });

        it('should return the error for a date in the future', (done) => {
            ctx = {
                'dob_provided': '1',
                'dob-day': '02',
                'dob-month': '03',
                'dob-year': '3000'
            };
            errors = [];
            [ctx, errors] = ApplicantDateOfBirth.handlePost(ctx, errors, formdata, session);
            expect(errors).to.deep.equal([
                {
                    field: 'dob',
                    href: '#dob',
                    msg: {
                        summary: content.errors.dob.dateInFuture.summary,
                        message: content.errors.dob.dateInFuture.message
                    }
                }
            ]);
            done();
        });

        it('should delete the dob variables if the user doesn\'t want to provide it', (done) => {
            ctx = {
                'provideDateOfBirth': 'optionPreferNotToSay',
                'dob-day': '02',
                'dob-month': '03',
                'dob-year': '1952'
            };
            errors = [];
            [ctx, errors] = ApplicantDateOfBirth.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                'provideDateOfBirth': 'optionPreferNotToSay'
            });
            done();
        });
    });
});
