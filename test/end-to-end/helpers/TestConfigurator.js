'use strict';
// eslint-disable-next-line no-unused-vars
const testConfig = require('test/config');
const request = require('request');
const assert = require('chai').assert;

class TestConfigurator {
    constructor() {
        this.testBaseUrl = testConfig.TestGetUserUrl;
        this.testProxy = testConfig.TestProxy;
        this.testUseProxy = testConfig.TestUseProxy;
    }

    getUserData(pcqid) {
        request({
            url: `http://pcq-backend-aat.service.core-compute-aat.internal/pcq/backend/getAnswer/${pcqid}`,
            method: 'GET',
            proxy: this.testProxy,
            headers: {'content-type': 'application/json'},
            // eslint-disable-next-line no-unused-vars
        },
        function (err, res, body) {
            if (!res) {
                err = new Error('node-librato-metrics: No response received!');
            } else {
                const userData = JSON.parse(body);
                assert.equal(userData.pcqId, pcqid, 'pcqid verfication');
                assert.equal(userData.ccdCaseId, testConfig.TestccdCaseId, 'Caseid verification');
                assert.equal(userData.partyId, testConfig.TestpartyId);
                assert.equal(userData.serviceId, testConfig.TestserviceId);
                assert.equal(userData.actor, testConfig.Testactor);
                assert.equal(userData.versionNo, testConfig.TestVerison);
            }
        });
    }

    getProxy() {
        return this.testProxy;
    }

    setPcqId() {
        const id = Math.floor(Math
            .random() * (99999 - 10000 + 1)) + 10000;
        return '58e' + id + '-2468-4370-a88e-bea2a80fa77f';
    }
}

module.exports = TestConfigurator;
