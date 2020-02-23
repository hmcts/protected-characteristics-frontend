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

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus}`, (done) => {
            const data = {
                sexualOrientation: 'optionHeterosexual'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });

        it(`test it redirects to applicant marital status page: ${expectedNextUrlForApplicantMaritalStatus} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantMaritalStatus);
        });
    });
});
