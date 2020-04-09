'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantDateOfBirth = require('app/steps/ui/dateofbirth');
const config = require('config');
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
        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant date of birth page: ${expectedNextUrlForApplicantDateOfBirth}`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantDateOfBirth);
        });
    });
});
