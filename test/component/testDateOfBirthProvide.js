'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantDateOfBirthPage = require('app/steps/ui/dateofbirth');
const ApplicantLanguage = require('app/steps/ui/language');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantProvideDateOfBirth', () => {
    let testWrapper;
    const expectedNextUrlForApplicantDateOfBirthPage = basePath + ApplicantDateOfBirthPage.getUrl();
    const expectedNextUrlForApplicantLanguage = basePath + ApplicantLanguage.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantProvideDateOfBirth');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantProvideDateOfBirth');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant date of birth page: ${expectedNextUrlForApplicantDateOfBirthPage}`, (done) => {
            const data = {
                provideDateOfBirth: 'optionYes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantDateOfBirthPage);
        });

        it(`test it redirects to applicant language page: ${expectedNextUrlForApplicantLanguage}`, (done) => {
            const data = {
                provideDateOfBirth: 'optionPreferNotToSay'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantLanguage);
        });

        it(`test it redirects to applicant language page: ${expectedNextUrlForApplicantLanguage} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantLanguage);
        });
    });
});
