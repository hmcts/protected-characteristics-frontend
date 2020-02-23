'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantHealthConditionsImplications = require('app/steps/ui/healthconditionsimplications');
const ApplicantPregnant = require('app/steps/ui/pregnant');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantHealthConditions', () => {
    let testWrapper;
    const expectedNextUrlForApplicantHealthConditionsImplications = basePath + ApplicantHealthConditionsImplications.getUrl();
    const expectedNextUrlForApplicantPregnant = basePath + ApplicantPregnant.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantHealthConditions');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantHealthConditions');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant health conditions implications page: ${expectedNextUrlForApplicantHealthConditionsImplications}`, (done) => {
            const data = {
                healthConditions: 'optionYes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantHealthConditionsImplications);
        });

        it(`test it redirects to applicant pregnant page: ${expectedNextUrlForApplicantPregnant}`, (done) => {
            const data = {
                healthConditions: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantPregnant);
        });

        it(`test it redirects to applicant pregnant page: ${expectedNextUrlForApplicantPregnant} - when no data is entered`, (done) => {
            const data = {};

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantPregnant);
        });
    });
});
