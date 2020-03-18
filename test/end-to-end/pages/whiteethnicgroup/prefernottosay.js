'use strict';

const pageUnderTest = require('app/steps/ui/ethnicwhite/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Prefer not to say');
    I.click('Continue');
};
