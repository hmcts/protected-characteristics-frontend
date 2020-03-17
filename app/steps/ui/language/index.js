'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantLanguage extends ValidationStep {

    static getUrl() {
        return '/language';
    }

    handlePost(ctx, errors) {
        if (ctx.language_main !== 2 && ctx.language_other) {
            delete ctx.language_other;
        }
        return [ctx, errors];
    }

    integerFields() {
        return ['language_main'];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'language_main', value: 2, choice: 'otherLanguage'}
            ]
        };
    }
}

module.exports = ApplicantLanguage;
