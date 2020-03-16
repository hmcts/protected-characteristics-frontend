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
                    {key: 'ethnic_group', value: '1', choice: 'White'},
                    {key: 'ethnic_group', value: '2', choice: 'Mixed'},
                    {key: 'ethnic_group', value: '3', choice: 'Asian'},
                    {key: 'ethnic_group', value: '4', choice: 'Black'},
                    {key: 'ethnic_group', value: '5', choice: 'Other'},
                ]
            });
            done();
        });
    });
});
