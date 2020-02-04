'use strict';

const dateformat = require('dateformat');
const submitData = (ctx, formdata) => {

    const body = {'type': 'Caveat'};
    body.applicationId = formdata.applicationId;

    body.applicant = {};
    body.applicant.firstName = formdata.applicant.firstName;
    body.applicant.lastName = formdata.applicant.lastName;
    body.applicant.email = formdata.applicant.email;
    body.applicant.address = formdata.applicant.address;

    body.deceased = {};
    body.deceased.firstName = formdata.deceased.firstName;
    body.deceased.lastName = formdata.deceased.lastName;

    body.deceased.address = formdata.deceased.address;

    body.deceased.dod_date = dateformat(formdata.deceased['dod-date'], 'yyyy-mm-dd');

    if (formdata.ccdCase) {
        body.ccdCase = {};
        body.ccdCase.id = formdata.ccdCase.id;
        body.ccdCase.state = formdata.ccdCase.state;
    }

    return body;
};

module.exports = submitData;
