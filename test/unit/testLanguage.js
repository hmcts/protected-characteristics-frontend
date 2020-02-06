'use strict';

const ApplicantLanguage = require('app/steps/ui/language');
const expect = require('chai').expect;

describe('ApplicantLanguage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantLanguage.getUrl();
            expect(url).to.equal('/language');
            done();
        });
    });
});
