'use strict';

const TestWrapper = require('test/util/TestWrapper');
const EndPage = require('app/steps/ui/endpage');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantPregnant', () => {
    let testWrapper;
    const expectedNextUrlForEndPage = basePath + EndPage.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantPregnant');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantPregnant');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to end page: ${expectedNextUrlForEndPage}`, (done) => {
            const data = {
                pregnant: 'optionYes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForEndPage);
        });

        it(`test it redirects to end page: ${expectedNextUrlForEndPage} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForEndPage);
        });
    });
});
