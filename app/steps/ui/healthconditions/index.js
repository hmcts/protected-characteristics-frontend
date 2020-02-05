'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const get = require('lodash').get;

class ApplicantHealthConditions extends ValidationStep {

    static getUrl() {
        return '/health-conditions';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.sex = get(formdata, 'sex.sex');
        ctx.gender = get(formdata, 'gender.gender');
        return ctx;
    }

    nextStepOptions(ctx) {
        ctx.male = ctx.sex === 'optionMale' && ctx.gender === 'optionYes';

        return {
            options: [
                {key: 'healthConditions', value: 'optionYes', choice: 'Yes'},
                {key: 'male', value: false, choice: 'Female'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.female;
        return [ctx, formdata];
    }
}

module.exports = ApplicantHealthConditions;
