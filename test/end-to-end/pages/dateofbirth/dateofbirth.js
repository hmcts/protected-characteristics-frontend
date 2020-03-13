'use strict';

const pageUnderTest = require('app/steps/ui/dateofbirth/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('#provideDateOfBirth');
    I.fillField('#dob-day', '10');
    I.fillField('#dob-month', '2');
    I.fillField('#dob-year', '2019');
};
