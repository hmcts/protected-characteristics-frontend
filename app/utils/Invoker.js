'use strict';

const uuidv4 = require('uuid/v4');
const {generateToken} = require('app/components/encryption-token');
const registeredServices = require('app/registeredServices');

class Invoker {

    get content() {
        const serviceList = registeredServices.map(service => {
            return {
                value: service.serviceId,
                text: service.serviceId
            };
        });

        const actorList = {};
        registeredServices.forEach(service => {
            actorList[service.serviceId] = service.actors;
        });

        const pcqLiteList = {};
        registeredServices.forEach(service => {
            pcqLiteList[service.serviceId] = service.pcqLite;
        });

        return {
            serviceList: serviceList,
            actorList: actorList,
            pcqLiteList: pcqLiteList
        };
    }

    serviceEndpoint(form) {
        const qs = Object.keys(form)
            .filter(key => form[key] !== '' && key !== '_csrf')
            .map(key => key + '=' + encodeURIComponent(form[key]))
            .join('&');

        return '/service-endpoint?' + qs;
    }

    fillForm(service, actor, fields) {
        const filler = {};

        fields.forEach(field => {
            filler[field] = this.fieldFiller(service, actor, field, this.isPcqLite(service));
        });

        return filler;
    }

    isPcqLite(req_serviceId) {
        let isPcqLite = false;
        registeredServices.map(s => s).forEach(service => {
            if ((service.serviceId.toLowerCase()).includes(req_serviceId.toLowerCase())) {
                isPcqLite = (service.pcqLite);
            }
        });
        return isPcqLite;
    }

    fieldFiller(service, actor, field, pcqLiteStatus) {
        /*eslint indent: [2, 4, {"SwitchCase": 1}]*/
        if (pcqLiteStatus) {
            switch (field) {
                case 'serviceId':
                    return service;
                case 'actor':
                    return actor;
                default:
                    return '';
            }
        } else {
            switch (field) {
                case 'pcqId':
                case 'ccdCaseId':
                    return uuidv4();
                case 'partyId':
                    return `${service}_${actor}@test.gov.uk`;
                case 'serviceId':
                    return service;
                case 'actor':
                    return actor;
                case 'language':
                    return 'en';
                case 'returnUrl':
                    return `${service}_${actor}.test.gov.uk`;
                default:
                    return '';
            }
        }
    }

    generateToken(params) {
        return generateToken(params);
    }

}

module.exports = Invoker;
