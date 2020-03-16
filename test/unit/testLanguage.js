'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantLanguage = steps.ApplicantLanguage;

describe('ApplicantLanguage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantLanguage.constructor.getUrl();
            expect(url).to.equal('/language');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantLanguage.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'language_main', value: '2', choice: 'otherLanguage'},
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

        it('should delete the language_other field from the context when not selected', (done) => {
            ctx = {
                'language': '1',
                'language_other': 'To be deleted'
            };
            errors = [];
            [ctx, errors] = ApplicantLanguage.handlePost(ctx, errors, formdata, session);
            expect(ctx).to.deep.equal({
                language: '1'
            });
            done();
        });
    });
});
