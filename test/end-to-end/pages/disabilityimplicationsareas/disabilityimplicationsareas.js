'use strict';

const pageUnderTest = require('app/steps/ui/disabilityimplicationsareas/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click('Vision');
    I.click('Continue');
};
