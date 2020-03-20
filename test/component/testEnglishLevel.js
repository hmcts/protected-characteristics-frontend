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

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - english level 1`, (done) => {
            const data = {
                english_language_level: 1
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - english level 2`, (done) => {
            const data = {
                english_language_level: 2
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - english level 3`, (done) => {
            const data = {
                english_language_level: 3
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - english level 4`, (done) => {
            const data = {
                english_language_level: 4
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - english level 0`, (done) => {
            const data = {
                english_language_level: 0
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantSex);
        });
    });
});
