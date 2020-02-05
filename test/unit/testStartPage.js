'use strict';

const StartApply = require('app/steps/ui/startpage/index');
const expect = require('chai').expect;

describe('StartPage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = StartApply.getUrl();
            expect(url).to.equal('/start-page');
            done();
        });
    });
});
