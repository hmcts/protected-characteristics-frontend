'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');
const StartPage = require('app/steps/ui/startpage/index');
const ValidWithFields = require('test/data/steps/multipartvalidation/ValidWithFields');

/**
 * We are using StartPage for this test as it does not inherit from MultiPartValidationStep.
 */
class InvalidChildSteps extends MultiPartValidationStep {

    static getUrl() {
        return '/test';
    }

    childSteps() {
        return [StartPage, ValidWithFields];
    }

    deleteChildFields() {
        return true;
    }
}

module.exports = InvalidChildSteps;
