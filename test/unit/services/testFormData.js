'use strict';

const expect = require('chai').expect;
const FormData = require('app/services/FormData');
const co = require('co');
const config = require('app/config');
const nock = require('nock');

describe('FormDataService', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should call post() successfully', (done) => {
        const endpoint = 'http://localhost';
        const inputForm = {deceased: {name: 'test'}};
        const expectedForm = {deceased: {name: 'test'}};
        const authToken = 'authToken';
        const serviceAuthorisation = 'serviceAuthorisation';
        const formData = new FormData(endpoint, 'abc123');
        nock(endpoint, {
            reqheaders: {
                'Content-Type': 'application/json',
                Authorization: authToken,
                ServiceAuthorization: serviceAuthorisation
            }
        }).post(config.services.orchestration.paths.forms, expectedForm)
            .reply(200, expectedForm);

        co(function* () {
            const actualForm = yield formData.post(authToken, serviceAuthorisation, inputForm);
            expect(actualForm).to.deep.equal(expectedForm);
            done();
        }).catch(err => {
            done(err);
        });
    });
});
