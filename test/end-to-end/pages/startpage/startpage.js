'use strict';

const pageUnderTest = require('app/steps/ui/startpage/index');
module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.see('Continue to the question');
    I.click('Continue to the question');
};
