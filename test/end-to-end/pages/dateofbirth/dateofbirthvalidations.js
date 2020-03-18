'use strict';

const pageUnderTest = require('app/steps/ui/dateofbirth/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Enter your date of birth');
    I.fillField('#dob-day', '45');
    I.fillField('#dob-month', '2');
    I.fillField('#dob-year', '2019');
    I.click('Continue');
};
