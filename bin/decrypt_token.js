/*
 * Decryption script
 */
'use strict';

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = process.argv[3] || 'SERVICE_TOKEN_KEY';
const key = crypto.scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0); // Initialization vector.

const token = process.argv[2];

// Check for token
if (!token) {
    throw Error('Token has not been passed...');
}

try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('------------------------ PARAMETERS ------------------------');
    console.log(JSON.parse(decrypted));
    console.log('-----------------------------------------------------------');
} catch (error) {
    console.log('Error decrypting the ciphertext:');
    console.error(error.code, error.message);
}
