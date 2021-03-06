'use strict';

const pageUnderTest = require('app/steps/ui/language/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('English or Welsh');
    I.click('Continue');
};
