'use strict';

const pageUnderTest = require('app/steps/ui/dateofbirth/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('No religion');
    I.click('Continue');
};
