'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantReligion = require('app/steps/ui/religion');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantEthnicBackgroundAsian', () => {
    let testWrapper;
    const expectedNextUrlForApplicantReligion = basePath + ApplicantReligion.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantEthnicBackgroundAsian');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantEthnicBackgroundAsian');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Indian`, (done) => {
            const data = {
                ethnicity: 9
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Pakistani`, (done) => {
            const data = {
                ethnicity: 10
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Bangladeshi`, (done) => {
            const data = {
                ethnicity: 11
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Chinese`, (done) => {
            const data = {
                ethnicity: 12
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantReligion);
        });

        it(`test it redirects to applicant religion page: ${expectedNextUrlForApplicantReligion} - Another`, (done) => {
            const data = {
                ethnicity: 13
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
