'use strict';

const Service = require('./Service');

class FormData extends Service {
    post(authToken, serviceAuthorisation, data = {}) {
        data.type = data.caseType;
        const url = this.endpoint + this.config.services.orchestrator.paths.forms;
        this.log('Post application form data');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };

        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = FormData;
