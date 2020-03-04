'use strict';

module.exports = {
    frontendPublicHttpProtocol: process.env.PUBLIC_PROTOCOL || 'http',
    environment: process.env.REFORM_ENVIRONMENT || 'prod',
    nodeEnvironment: process.env.NODE_ENV,
    gitRevision: process.env.GIT_REVISION,
    externalHostNameUrl: process.env.EXTERNAL_HOSTNAME_URL || '',
    languages: ['en', 'cy'],
    featureToggles: {
        url: process.env.FEATURE_TOGGLES_API_URL || 'http://localhost:9292',
        path: process.env.FEATURE_TOGGLES_PATH || '/api/ff4j/check',
        port: 9292,
        pc_shutter_ft: 'protected-characteristics-shutter',
        appwideToggles: []
    },
    app: {
        useHttps: process.env.USE_HTTPS || 'false',
        port: process.env.PORT || '4000',
        useCSRFProtection: 'true',
        basePath: process.env.APP_BASE_PATH || ''
    },
    services: {
        orchestration: {
            url: process.env.ORCHESTRATION_SERVICE_URL || 'http://localhost:8888',
            port: 8888,
            paths: {
                checkanswerspdf: 'documents/generate/checkAnswersSummary'
            }
        }
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || 'dummy_password',
        useTLS: process.env.REDIS_USE_TLS || 'false',
        enabled: process.env.USE_REDIS || 'false',
        secret: process.env.REDIS_SECRET || 'OVERWRITE_THIS',
        proxy: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        }
    },
    dateFormat: 'DD/MM/YYYY',
    payloadVersion: '4.1.0',
    hostname: process.env.FRONTEND_HOSTNAME || 'localhost:3000',
    gaTrackingId: process.env.GA_TRACKING_ID || 'UA-XXXXXXXX-X',
    enableTracking: process.env.ENABLE_TRACKING || 'true',
    webChat: {
        chatId: process.env.WEBCHAT_CHAT_ID || 'XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXX',
        tenant: process.env.WEBCHAT_TENANT || 'XXXXXXXXXXXXXXXXXXX',
        buttonNoAgents: process.env.WEBCHAT_BUTTON_NO_AGENTS || 'XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXX',
        buttonAgentsBusy: process.env.WEBCHAT_BUTTON_AGENTS_BUSY || 'XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXX',
        buttonServiceClosed: process.env.WEBCHAT_BUTTON_SERVICE_CLOSED || 'XXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXX'
    },
    links: {
        cookies: (process.env.APP_BASE_PATH || '') + '/cookies',
        privacy: (process.env.APP_BASE_PATH || '') + '/privacy-policy',
        terms: (process.env.APP_BASE_PATH || '') + '/terms-conditions',
        accessibility: (process.env.APP_BASE_PATH || '') + '/accessibility-statement',
        callCharges: 'https://www.gov.uk/call-charges',
        howToManageCookies: 'https://www.aboutcookies.org',
        googlePrivacyPolicy: 'https://www.google.com/policies/privacy/partners/',
        googleAnalyticsOptOut: 'https://tools.google.com/dlpage/gaoptout/',
        mojPersonalInformationCharter: 'https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter',
        survey: process.env.SURVEY || 'https://www.smartsurvey.co.uk/s/PCQ_Feedback/',
        applicationFormPA8A: 'https://www.gov.uk/government/publications/form-pa8a-caveat-application-form',
        whoInheritsLink: 'https://www.gov.uk/inherits-someone-dies-without-will',
        citizenAdvice: 'https://www.citizensadvice.org.uk/',
        goodThingsFoundation: 'https://www.goodthingsfoundation.org',
        subjectAccessRequest: 'https://www.gov.uk/government/publications/request-your-personal-data-from-moj',
        complaintsProcedure: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure',
        informationCommissionersOffice: 'https://ico.org.uk/global/contact-us',
        applicationFormPA15: 'https://www.gov.uk/government/publications/form-pa15-apply-for-renunciation-will',
        deathReportedToCoroner: 'https://www.gov.uk/after-a-death/when-a-death-is-reported-to-a-coroner',
        myAbilityLink: 'https://mcmw.abilitynet.org.uk/',
        equalityAdvisorLink: 'https://www.equalityadvisoryservice.com/',
        wcag21Link: 'https://www.w3.org/TR/WCAG21/'
    },
    utils: {
        api: {
            retries: process.env.RETRIES_NUMBER || 10,
            retryDelay: process.env.RETRY_DELAY || 1000,
            timeout: 30000
        }
    },
    livenessEndpoint: '/health/liveness',
    healthEndpoint: '/health',
    appInsights: {
        instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATION_KEY
    }
};
