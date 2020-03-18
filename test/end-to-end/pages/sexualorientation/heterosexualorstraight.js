'use strict';

const pageUnderTest = require('app/steps/ui/sexualorientation/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Heterosexual or straight');
    I.click('Continue');
};
