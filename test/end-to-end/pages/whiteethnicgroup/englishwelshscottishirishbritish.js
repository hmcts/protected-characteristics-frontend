'use strict';

const pageUnderTest = require('app/steps/ui/ethnicwhite/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('English, Welsh, Scottish, Northern Irish or British');
    I.click('Continue');
};
