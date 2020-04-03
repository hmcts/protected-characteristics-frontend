'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantReligion = require('app/steps/ui/religion');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('config');
const basePath = config.app.basePath;

describe('ApplicantEthnicBackgroundMixed', () => {
    let testWrapper;
    const expectedNextUrlForApplicantReligion = basePath + ApplicantReligion.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantEthnicBackgroundMixed');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantEthnicBackgroundMixed');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - White and Black Caribbean`, (done) => {
            const data = {
                ethnicity: 5
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - White and Black African`, (done) => {
            const data = {
                ethnicity: 6
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - White and Asian`, (done) => {
            const data = {
                ethnicity: 7
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Another`, (done) => {
            const data = {
                ethnicity: 8
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Prefer not to say`, (done) => {
            const data = {
                ethnicity: 0
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantReligion);
        });
    });
});
