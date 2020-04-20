'use strict';
const serviceEndpointUrl = require('test/end-to-end/utils').serviceEndpointUrl;
module.exports = function (pcqId) {
    const I = this;
    // eslint-disable-next-line no-unused-vars
    I.amOnPage(serviceEndpointUrl(
        {
            serviceId: 'PROBATE',
            actor: 'APPLICANT',
            pcqId: pcqId,
            ccdCaseId: '1234567890123456',
            partyId: 'test@gmail.com',
            returnUrl: 'dummy-return-url',
            language: 'en'
        }));
    I.see('Continue to the question');
    I.click('Continue to the question');
};
