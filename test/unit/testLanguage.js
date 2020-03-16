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
});
