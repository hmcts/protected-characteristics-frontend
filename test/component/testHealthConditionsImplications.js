'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantHealthConditionsImplicationAreas = require('app/steps/ui/healthconditionsimplicationsareas');
const ApplicantPregnant = require('app/steps/ui/pregnant');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantHealthConditionsImplications', () => {
    let testWrapper;
    const expectedNextUrlForApplicantHealthConditionsImplicationAreas = basePath + ApplicantHealthConditionsImplicationAreas.getUrl();
    const expectedNextUrlForApplicantPregnant = basePath + ApplicantPregnant.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantHealthConditionsImplications');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantHealthConditionsImplications');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant health conditions implications areas page: ${expectedNextUrlForApplicantHealthConditionsImplicationAreas}`, (done) => {
            const data = {
                healthConditionsImplications: 'optionYesLot'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantHealthConditionsImplicationAreas);
        });

        it(`test it redirects to applicant health conditions implications areas page: ${expectedNextUrlForApplicantHealthConditionsImplicationAreas}`, (done) => {
            const data = {
                healthConditionsImplications: 'optionYesLittle'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantHealthConditionsImplicationAreas);
        });

        it(`test it redirects to applicant pregnant page: ${expectedNextUrlForApplicantPregnant}`, (done) => {
            const data = {
                healthConditionsImplications: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantPregnant);
        });
    });
});
