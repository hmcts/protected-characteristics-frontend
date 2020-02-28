'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantDisability = require('app/steps/ui/disability');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantReligion', () => {
    let testWrapper;
    const expectedNextUrlForApplicantDisability = basePath + ApplicantDisability.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantReligion');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantReligion');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant disability page: ${expectedNextUrlForApplicantDisability}`, (done) => {
            const data = {
                religion: 'optionNoReligion'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantDisability);
        });

        it(`test it redirects to applicant disability page: ${expectedNextUrlForApplicantDisability} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantDisability);
        });
    });
});
