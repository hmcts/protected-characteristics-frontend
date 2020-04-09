module.exports = {
    TestGetUserUrl: 'http://pcq-backend-aat.service.core-compute-aat.internal/pcq/backend/getAnswer',
    TestProxy: process.env.TEST_PROXY || 'http://proxyout.reform.hmcts.net:8080',
    TestUseProxy: process.env.TEST_USE_PROXY || 'true',
    TestccdCaseId: '1234567890123456',
    TestpartyId: 'test@gmail.com',
    TestserviceId: 'PROBATE',
    Testactor: 'CITIZEN',
    TestVerison: '1'
};
