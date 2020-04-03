'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantGenderSameAsSex = require('app/steps/ui/gender');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('config');
const basePath = config.app.basePath;

describe('ApplicantSex', () => {
    let testWrapper;
    const expectedNextUrlForApplicantGenderSameAsSex = basePath + ApplicantGenderSameAsSex.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantSex');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantSex');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant gender same as sex page: ${expectedNextUrlForApplicantGenderSameAsSex} - Male`, (done) => {
            const data = {sex: 1};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantGenderSameAsSex);
        });

        it(`test it redirects to applicant gender same as sex page: ${expectedNextUrlForApplicantGenderSameAsSex} - Female`, (done) => {
            const data = {sex: 2};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantGenderSameAsSex);
        });

        it(`test it redirects to applicant gender same as sex page: ${expectedNextUrlForApplicantGenderSameAsSex} - Prefer not to say`, (done) => {
            const data = {sex: 0};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantGenderSameAsSex);
        });

        it(`test it redirects to applicant gender same as sex page: ${expectedNextUrlForApplicantGenderSameAsSex} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantGenderSameAsSex);
        });
    });
});
