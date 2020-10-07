'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');

class ValidWithFields extends MultiPartValidationStep {

    static getUrl() {
        return '/test';
    }

    static fields() {
        return ['test1', 'test2', 'test3'];
    }
}

module.exports = ValidWithFields;
