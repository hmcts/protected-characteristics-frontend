'use strict';

const TestWrapper = require('test/util/TestWrapper');
const testCommonContent = require('test/component/common/testCommonContent.js');

describe('end-page', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('EndPage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('EndPage');

        it('test content loaded on the page', (done) => {
            testWrapper.testContentNotPresent(done);
        });
    });
});
