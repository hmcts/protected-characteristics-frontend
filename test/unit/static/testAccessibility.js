'use strict';

const Accessibility = require('app/steps/ui/static/accessibility');
const expect = require('chai').expect;

describe('Accessibility', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Accessibility.getUrl();
            expect(url).to.equal('/accessibility-statement');
            done();
        });
    });
});
