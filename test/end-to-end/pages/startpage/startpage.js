'use strict';

//const pageUnderTest = require('app/steps/ui/startpage/index');
module.exports = function () {
    const I = this;
    I.amOnPage('/webhp');
    I.fillField('q', 'wikipedia');
    I.pressKey('Enter');
    I.see('Wikipedia');
    console.log('Passed!...');
};
