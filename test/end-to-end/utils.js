'use strict';

exports.serviceEndpointUrl = function (params) {
    const qs = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');

    return `/service-endpoint?${qs}`;
};
