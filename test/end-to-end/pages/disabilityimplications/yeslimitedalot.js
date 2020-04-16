'use strict';

const pageUnderTest = require('app/steps/ui/disabilityimplications/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Yes, limited a lot');
    I.click('Continue');
};
