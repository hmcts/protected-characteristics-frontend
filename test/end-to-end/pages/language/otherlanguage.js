'use strict';

const pageUnderTest = require('app/steps/ui/language/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Other');
    I.fillField('#language_other', 'otherDetails');
    I.click('Continue');
};
