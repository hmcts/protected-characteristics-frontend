'use strict';

const pageUnderTest = require('app/steps/ui/religion/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Any other religion');
    I.fillField('#religion_other', 'otherDetails');
    I.click('Continue');
};
