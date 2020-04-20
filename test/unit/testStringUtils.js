'use strict';

const expect = require('chai').expect;
const prefixHttps = require('app/components/string-utils').prefixHttps;

describe('prefixHttps()', () => {

    it('should add HTTPS to the URL if missing', (done) => {
        expect(prefixHttps('https://test.com')).to.equal('https://test.com');
        expect(prefixHttps('http://test.com')).to.equal('http://test.com');
        expect(prefixHttps('test.com')).to.equal('https://test.com');
        expect(prefixHttps('    test.com')).to.equal('https://test.com');
        expect(prefixHttps('    test      .        com')).to.equal('https://test.com');
        done();
    });

});
