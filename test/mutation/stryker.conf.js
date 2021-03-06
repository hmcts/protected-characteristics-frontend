module.exports = {
    mutator: 'javascript',
    reporters:
        [
            'clear-text',
            'progress',
            'html'
        ],
    htmlReporter: {baseDir: 'functional-output/mutation-assets'},
    coverageAnalysis: 'perTest',
    mutate:
        [
            'app/steps/ui/**/index.js',
            'app/middleware/*'
        ],
    files: [
        'app.js',
        'server.js',
        'package.json',
        'git.properties.json',
        'app/**',
        'config/*',
        'test/**'
    ],
    testRunner: 'mocha',
    testFramework: 'mocha',
    mochaOptions: {
        spec:
            [
                'test/component/**',
                'test/unit/**'
            ],
        timeout: 8000
    },
    logLevel: 'debug'
};
