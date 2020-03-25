'use strict';

const pageUnderTest = require('app/steps/ui/startpage/index');
//const serviceEndpointUrl = require('test/end-to-end/utils').serviceEndpointUrl;

module.exports = function () {
    const I = this;
    //I.amOnPage(serviceEndpointUrl({returnUrl: 'dummy-return-url'}));
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.see('Continue to the question');
    // I.see('I don\'t want to answer these questions');
    I.click('Continue to the question');
};
