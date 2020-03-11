'use strict';

const DateStep = require('app/core/steps/DateStep');
const FieldError = require('app/components/error');

class ApplicantDateOfBirth extends DateStep {

    static getUrl() {
        return '/date-of-birth';
    }

    dateName() {
        return ['dob'];
    }

    handlePost(ctx, errors) {
        if (ctx.provideDateOfBirth === '1') {
            const dob = new Date(`${ctx['dob-year']}-${ctx['dob-month']}-${ctx['dob-day']}`);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dob >= today) {
                errors.push(FieldError('dob-date', 'dateInFuture', this.resourcePath, this.generateContent()));
            }
        } else {
            delete ctx['dob-day'];
            delete ctx['dob-month'];
            delete ctx['dob-year'];
            delete ctx['dob-formattedDate'];
        }

        return [ctx, errors];
    }
}

module.exports = ApplicantDateOfBirth;
