'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantSex = require('app/steps/ui/sex');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantEnglishLevel', () => {
    let testWrapper;
    const expectedNextUrlForApplicantSex = basePath + ApplicantSex.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantEnglishLevel');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantEnglishLevel');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex}`, (done) => {
            const data = {
                english_language_level: '1'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantSex);
        });
    });
});
