'use strict';
// eslint-disable-next-line no-unused-vars
const testConfig = require('test/config');
const request = require('request');
const assert = require('assert');

class TestConfigurator {
    constructor() {
        this.testBaseUrl = testConfig.TestGetUserUrl;
        this.testProxy = testConfig.TestProxy;
    }

    getUserData(pcqid) {
        request({
            url: this.testBaseUrl + pcqid,
            method: 'GET',
            // eslint-disable-next-line no-unused-vars
        }, function (error, response, body) {
            // eslint-disable-next-line eqeqeq
            if (response.statusCode == 200) {
                const userData = JSON.parse(body);
                console.log('this is id :' + userData.id);
                console.log('this is address :' + userData.address.street);
                assert.strictEqual(userData.address.street, 'Kulas Light');
                console.log('success');
            } else {
                // eslint-disable-next-line eqeqeq
                if (response.statusCode == 500) {
                    console.log('Internal Server Error!!');
                }
                console.log('The Response is  :' + response.statusCode);
            }
        });
    }

    getProxy() {
        return this.testProxy;
    }

}

module.exports = TestConfigurator;
