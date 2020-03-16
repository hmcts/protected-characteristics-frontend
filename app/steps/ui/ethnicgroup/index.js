'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicGroup extends ValidationStep {

    static getUrl() {
        return '/ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnicGroup === '0') {
            ctx.ethnicity = '0';
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    ignoreFieldsOnPost() {
        return ['ethnicGroup'];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'ethnicGroup', value: 'optionWhite', choice: 'White'},
                {key: 'ethnicGroup', value: 'optionMixed', choice: 'Mixed'},
                {key: 'ethnicGroup', value: 'optionAsian', choice: 'Asian'},
                {key: 'ethnicGroup', value: 'optionBlack', choice: 'Black'},
                {key: 'ethnicGroup', value: 'optionOther', choice: 'Other'},
            ]
        };
    }
}

module.exports = ApplicantEthnicGroup;
