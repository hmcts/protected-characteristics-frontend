'use strict';
const serviceEndpointUrl = require('test/end-to-end/utils').serviceEndpointUrl;
const uuidv4 = require('uuid/v4');
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const {I} = inject();

Given('user is on pcq start page', () => {
    I.amOnPage(serviceEndpointUrl(
        {
            serviceId: 'PROBATE',
            actor: 'CITIZEN',
            pcqId: uuidv4(),
            ccdCaseId: '1234567890123456',
            partyId: 'test@gmail.com',
            returnUrl: 'dummy-return-url',
            language: 'en'
        }));
});

Then('user should see Equality and diversity questions', () => {
    I.see('Continue to the question');
    I.see('I don\'t want to answer these questions');
    I.see('Equality and diversity questions');
});
