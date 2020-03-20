'use strict';

const pageUnderTest = require('app/steps/ui/sexualorientation/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Other');
    I.fullFile('#otherDetails', 'otherDetails');
    I.click('Continue');
};
