'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantSex = require('app/steps/ui/sex');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('language', () => {
    let testWrapper;
    const expectedNextUrlForApplicantSex = basePath + ApplicantSex.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantLanguage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantLanguage');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant sex: ${expectedNextUrlForApplicantSex}`, (done) => {
            const data = {
                bilingual: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });
    });
});
