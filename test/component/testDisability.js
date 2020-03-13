'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantDisabilityImplications = require('app/steps/ui/disabilityimplications');
const ApplicantPregnant = require('app/steps/ui/pregnant');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantDisability', () => {
    let testWrapper;
    const expectedNextUrlForApplicantDisabilityImplications = basePath + ApplicantDisabilityImplications.getUrl();
    const expectedNextUrlForApplicantPregnant = basePath + ApplicantPregnant.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantDisability');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantDisability');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant disability implications page: ${expectedNextUrlForApplicantDisabilityImplications}`, (done) => {
            const data = {
                disability: '1'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantDisabilityImplications);
        });

        it(`test it redirects to applicant pregnant page: ${expectedNextUrlForApplicantPregnant}`, (done) => {
            const data = {
                disability: '2'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantPregnant);
        });

        it(`test it redirects to applicant pregnant page: ${expectedNextUrlForApplicantPregnant} - when no data is entered`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForApplicantPregnant);
        });
    });
});
