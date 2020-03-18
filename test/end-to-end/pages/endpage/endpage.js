'use strict';

const pageUnderTest = require('app/steps/ui/endpage/index');

module.exports = function () {
    const I = this;
    I.amOnPage(pageUnderTest.getUrl());
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.see('have answered the equality questions');
};
