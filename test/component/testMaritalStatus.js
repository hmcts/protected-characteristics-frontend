'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantEthnicGroup = require('app/steps/ui/ethnicgroup');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantMaritalStatus', () => {
    let testWrapper;
    const expectedNextUrlForApplicantEthnicGroup = basePath + ApplicantEthnicGroup.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantMaritalStatus');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantMaritalStatus');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant ethnic group page: ${expectedNextUrlForApplicantEthnicGroup}`, (done) => {
            const data = {
                maritalStatus: 'optionYes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantEthnicGroup);
        });
    });
});
