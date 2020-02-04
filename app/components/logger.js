'use strict';

const {Logger} = require('@hmcts/nodejs-logging');
let logger;

const log = (sessionId) => {
    return (logger) ? logger : Logger.getLogger(`protected-characteristics-frontend, sessionId: ${sessionId}`);
};

module.exports = log;
