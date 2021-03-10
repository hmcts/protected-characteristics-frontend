'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');
const ValidWithFields = require('test/data/steps/multipartvalidation/ValidWithFields');

class TestStep extends MultiPartValidationStep {

    static getUrl() {
        return '/test';
    }

    childSteps() {
        return [ValidWithFields];
    }

    deleteChildFields(ctx) {
        return ctx.test === 1;
    }
}

module.exports = TestStep;
