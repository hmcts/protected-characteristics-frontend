module.exports = {
    TestFrontendUrl: process.env.TEST_URL || 'http://localhost:4000',
    TestGetUserUrl: 'http://pcq-backend-aat.service.core-compute-aat.internal/pcq/backend/getAnswer',
    TestProxy: process.env.TEST_PROXY || 'http://proxyout.reform.hmcts.net:8080',
    TestUseProxy: process.env.TEST_USE_PROXY || 'true',
    TestccdCaseId: '1234567890123456',
    TestpartyId: 'test@gmail.com',
    TestserviceId: 'PROBATE',
    Testactor: 'APPLICANT',
    TestVerison: '1'
};
