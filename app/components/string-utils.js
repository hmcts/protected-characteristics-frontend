'use strict';

const prefixHttps = (url = '') => {
    url = url.trim().replace(/\s/g, '');
    if (!(/^(?:f|ht)tps?:\/\//).test(url)) {
        url = 'https://' + url;
    }
    return url;
};

module.exports = {
    prefixHttps
};
