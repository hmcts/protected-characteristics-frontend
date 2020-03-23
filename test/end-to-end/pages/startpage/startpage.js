'use strict';

const pageUnderTest = require('app/steps/ui/startpage/index');
const serviceEndpointUrl = require('test/end-to-end/utils').serviceEndpointUrl;

module.exports = function () {
    const I = this;
    console.log('this is the url '+ serviceEndpointUrl({returnUrl: 'dummy-return-url'}));
    I.amOnPage(serviceEndpointUrl({returnUrl: 'dummy-return-url'}));
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    console.log('this is the url '+ pageUnderTest.getUrl())
    I.see('Continue to the question');
    I.see('I don\'t want to answer these questions');
    I.click('Continue to the question');
};
