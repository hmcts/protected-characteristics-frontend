'use strict';

const Privacy = require('app/steps/ui/static/privacy');
const expect = require('chai').expect;

describe('PrivacyPolicy', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Privacy.getUrl();
            expect(url).to.equal('/privacy-policy');
            done();
        });
    });
});
