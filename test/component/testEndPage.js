'use strict';

const TestWrapper = require('test/util/TestWrapper');

describe('EndPage', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('EndPage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it('test link to return URL is present', (done) => {
            const sessionData = {
                returnUrl: 'http://invoking-service-return-url',
                language: 'cy'
            };

            testWrapper.agent.post('/prepare-session-field')
                .send(sessionData)
                .end(() => {
                    const playbackData = {
                        returnUrl: 'http://invoking-service-return-url?locale=cy'
                    };

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });
    });
});
