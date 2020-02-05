'use strict';

const TestWrapper = require('test/util/TestWrapper');
const testCommonContent = require('test/component/common/testCommonContent.js');

describe('start-page', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('StartPage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('StartPage');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });
    });
});
