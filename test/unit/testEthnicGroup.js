'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantEthnicGroup = steps.ApplicantEthnicGroup;

describe('ApplicantEthnicGroup', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantEthnicGroup.constructor.getUrl();
            expect(url).to.equal('/ethnic-group');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantEthnicGroup.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'ethnicGroup', value: 'optionWhite', choice: 'White'},
                    {key: 'ethnicGroup', value: 'optionMixed', choice: 'Mixed'},
                    {key: 'ethnicGroup', value: 'optionAsian', choice: 'Asian'},
                    {key: 'ethnicGroup', value: 'optionBlack', choice: 'Black'},
                    {key: 'ethnicGroup', value: 'optionOther', choice: 'Other'},
                ]
            });
            done();
        });
    });
});
