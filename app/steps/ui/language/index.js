'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantLanguage extends ValidationStep {

    static getUrl() {
        return '/language';
    }

    get requiredFields() {
        return ['language_main'];
    }

    handlePost(ctx, errors) {
        [ctx, errors] = super.handlePost(ctx, errors);
        if (ctx.language_main !== 2 && ctx.language_other) {
            delete ctx.language_other;
        }
        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['language_other'];
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
