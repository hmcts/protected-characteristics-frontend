'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantMaritalStatus = require('app/steps/ui/maritalstatus');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantSexualOrientation', () => {
    let testWrapper;
    const expectedNextUrlForApplicantMaritalStatus = basePath + ApplicantMaritalStatus.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantSexualOrientation');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantSexualOrientation');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - Heterosexual`, (done) => {
            const data = {sexuality: 1};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - Gay/Lesbian`, (done) => {
            const data = {sexuality: 2};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - Bisexual`, (done) => {
            const data = {sexuality: 3};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - Other`, (done) => {
            const data = {sexuality: 4};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - Prefer not to say`, (done) => {
            const data = {sexuality: 0};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantMaritalStatus);
        });
    });
});
