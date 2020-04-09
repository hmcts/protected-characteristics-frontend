'use strict';

const TestWrapper = require('test/util/TestWrapper');
const config = require('config');
const commonContent = require('app/resources/en/translation/common');

describe('accessibility', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('Accessibility');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test content loaded on the page', (done) => {
            const contentData = {
                myAbilityLink: config.links.myAbilityLink,
                helpLineNumber: commonContent.helpTelephoneNumber,
                helpLineHours: commonContent.helpTelephoneOpeningHours,
                callChargesLink: config.links.callCharges,
                equalityAdvisorLink: config.links.equalityAdvisorLink,
                wcag21Link: config.links.wcag21Link,
                applicationFormPA15: config.links.applicationFormPA15,
                deathReportedToCoroner: config.links.deathReportedToCoroner,
                pcqStartApplyLink: config.links.pcqStartApplyLink
            };

            testWrapper.testContent(done, contentData);
        });
    });
});
