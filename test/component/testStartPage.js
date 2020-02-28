'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantDateOfBirth = require('app/steps/ui/dateofbirth');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('StartPage', () => {
    let testWrapper;
    const expectedNextUrlForApplicantDateOfBirth = basePath + ApplicantDateOfBirth.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('StartPage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('StartPage');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant date of birth page: ${expectedNextUrlForApplicantDateOfBirth}`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantDateOfBirth);
        });
    });
});
