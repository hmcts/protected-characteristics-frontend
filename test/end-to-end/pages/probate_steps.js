'use strict';

const requireDirectory = require('require-directory');
const probate_steps = requireDirectory(module);

module.exports = function () {

    return actor({
        // Start application
        startApplication: probate_steps.startapply.startapply,

        enterApplicantName: probate_steps.applicant.name,
        enterApplicantEmail: probate_steps.applicant.email,
        enterApplicantAddressManually: probate_steps.applicant.address,
        enterDeceasedName: probate_steps.deceased.name,
        enterDeceasedDateOfDeath: probate_steps.deceased.dod,
        enterDeceasedDateOfBirthKnown: probate_steps.deceased.dobknown,
        enterDeceasedDateOfBirth: probate_steps.deceased.dob,
        enterDeceasedHasAlias: probate_steps.deceased.alias,
        enterDeceasedOtherNames: probate_steps.deceased.othernames,
        enterDeceasedAddressManually: probate_steps.deceased.address,
        seeSummaryPage: probate_steps.summary.summary,

        // Payment
        seePaymentBreakdownPage: probate_steps.payment.paymentbreakdown,
        seeGovUkPaymentPage: probate_steps.payment.govukpayment,
        seeGovUkConfirmPage: probate_steps.payment.govukconfirmpayment,
        seePaymentStatusPage: probate_steps.payment.paymentstatus,

        // enterPaymentBreakdown: probate_steps.payment.breakdown,

        // Temp stop page to represent end of journey
        seeThankYouPage: probate_steps.thankyou.thankyou
    });
};
