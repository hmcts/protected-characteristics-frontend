'use strict';

const pageUnderTest = require('app/steps/ui/ethnicgroup/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Mixed or multiple ethnic groups');
    I.click('Continue');
};
