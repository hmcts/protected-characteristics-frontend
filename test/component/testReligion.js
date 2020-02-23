'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantHealthConditions = require('app/steps/ui/healthconditions');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantReligion', () => {
    let testWrapper;
    const expectedNextUrlForApplicantHealthConditions = basePath + ApplicantHealthConditions.getUrl();

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

        it(`test it redirects to applicant health conditions page: ${expectedNextUrlForApplicantHealthConditions}`, (done) => {
            const data = {
                religion: 'optionNoReligion'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantHealthConditions);
        });

        it(`test it redirects to applicant health conditions page: ${expectedNextUrlForApplicantHealthConditions} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantHealthConditions);
        });
    });
});
