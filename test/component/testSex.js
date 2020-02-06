'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantGenderSameAsSex = require('app/steps/ui/gender');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
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

        it(`test it redirects to applicant gender same as sex page: ${expectedNextUrlForApplicantGenderSameAsSex}`, (done) => {
            const data = {
                sex: 'optionMale'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantGenderSameAsSex);
        });
    });
});
