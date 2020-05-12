'use strict';

const crypto = require('crypto');
const config = require('config');
const logger = require('app/components/logger')('Init');

const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0); // Initialization vector.

const verifyToken = (reqQuery) => {
    const {token, ...params} = reqQuery;
    const serviceId = params.serviceId;
    const tokenKey = config.tokenKeys[(serviceId || '').toLowerCase()];

    if (!token) {
        logError('Token is missing from the query string.');
    }
    if (!params.serviceId) {
        logError('serviceId is missing from the incoming parameters.');
    } else if (!tokenKey) {
        logError(`Token key is missing for service id: ${serviceId}`);
    }

    let verified = false;
    if (token && tokenKey) {
        logger.info(`Using ${tokenKey === 'SERVICE_TOKEN_KEY' ? 'local' : 'Azure KV'} secret for service token key`);
        const key = crypto.scryptSync(tokenKey, 'salt', 32);
        const strParams = JSON.stringify(params);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(strParams, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        verified = encrypted === token;

        if (verified) {
            logger.info('Token successfully verified.');
        } else {
            logError('Tokens mismatched.');
        }
    }

    return verified;
};

const logError = (error) => {
    logger.error('Error validating token: ' + error);
};

module.exports = verifyToken;
