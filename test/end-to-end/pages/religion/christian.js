'use strict';

const pageUnderTest = require('app/steps/ui/religion/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Christian');
    I.click('Continue');
};
