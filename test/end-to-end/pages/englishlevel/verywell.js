'use strict';

const pageUnderTest = require('app/steps/ui/englishlevel/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Very well');
    I.click('Continue');
};
