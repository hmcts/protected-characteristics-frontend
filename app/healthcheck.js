'use strict';

const healthcheck = require('@hmcts/nodejs-healthcheck');
const os = require('os');
const config = require('config');
const outputs = require('@hmcts/nodejs-healthcheck/healthcheck/outputs');
const getStore = require('app/components/utils').getStore;
const session = require('express-session');
const logger = require('app/components/logger')('init');

const osHostname = os.hostname();
const gitProperties = require('git.properties');
const gitCommitId = gitProperties.git.commit.id;
const gitRevision = process.env.GIT_REVISION;

const healthOptions = message => {
    return {
        callback: (error, res) => {
            if (error) {
                logger.error(null, 'health_check_error', message, error);
            }
            return !error && res.status === 200 ? outputs.up() : outputs.down(error);
        },
        timeout: config.health.timeout,
        deadline: config.health.deadline
    };
};

const sessionStore = getStore(config.redis, session);
const checks = {
    'pcq-backend': healthcheck.web(`${config.services.pcqBackend.url}/health`,
        healthOptions('Health check failed on pcq-backend:')
    )
};
if (sessionStore.constructor.name === 'RedisStore') {
    checks.redis = healthcheck.raw(() => {
        return sessionStore.client.status === 'ready' ? healthcheck.up() : healthcheck.down();
    });
}

const setup = app => {
    healthcheck.addTo(app, {
        checks: checks,
        buildInfo: {
            name: config.service.name,
            host: os.hostname(),
            uptime: process.uptime(),
            version: gitRevision,
            gitCommitId
        }
    });
};

module.exports = {
    setup: setup,
    osHostname: osHostname,
    gitCommitId: gitCommitId
};
