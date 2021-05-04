'use strict';

const crypto = require('crypto');
const config = require('config');
const logger = require('app/components/logger')('Init');

const algorithmAesGcm256 = 'aes-256-gcm';
const algorithmAesCbc256 = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0); // Initialization vector

const generateToken = (params, algorithm) => {
    algorithm = algorithm || algorithmAesGcm256;
    const serviceId = params.serviceId;
    const tokenKey = config.tokenKeys[(serviceId || '').toLowerCase()];

    let encrypted = '';

    if (!params.serviceId) {
        logError('serviceId is missing from the incoming parameters.');
    } else if (!tokenKey) {
        logError(`Token key is missing for service id: ${serviceId}`);
    } else {
        logger.info(`Using ${tokenKey === 'SERVICE_TOKEN_KEY' ? 'local' : 'Azure KV'} secret for service token key`);
        const key = crypto.scryptSync(tokenKey, 'salt', 32);
        const strParams = JSON.stringify(params);

        logger.info('Params string: ' + strParams);

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        encrypted = cipher.update(strParams, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    }

    return encrypted;

};

const verifyToken = (reqQuery) => {
    const {token, ...params} = reqQuery;

    let verified = false;
    if (token) {
        const myToken = generateToken(params);
        verified = myToken === token;

        logger.info('Token myToken: ' + myToken);
        logger.info('Token probate: ' + token);

        if (verified) {
            logger.info('Token successfully verified.');
        } else {
            const myTokenLegacy = generateToken(params, algorithmAesCbc256);
            verified = myTokenLegacy === token;

            if (verified) {
                logger.info('Legacy token successfully verified.');
            } else {
                logError('Tokens mismatched.');
            }
        }
    } else {
        logError('Token is missing from the query string.');
    }

    return verified;
};

const logError = (error) => {
    logger.error('Error validating token: ' + error);
};

module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken
};
