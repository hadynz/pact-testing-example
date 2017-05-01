const chai = require('chai');

const pactProvider = require('./pactProvider');
const webpackConfig = require('../../webpack/ntegration-tests.config');

const WEBPACK_DEV_SERVER_PORT = 3000;

exports.config = {
  specs: [
    './tests/features/**/*.feature'
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    { browserName: 'chrome' }
  ],
  services: ['selenium-standalone', 'webpack-dev-server'],
  reporters: ['spec'],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: `http://localhost:${WEBPACK_DEV_SERVER_PORT}`,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  webpackConfig: webpackConfig,
  webpackPort: WEBPACK_DEV_SERVER_PORT,
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./tests/steps'], // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    compiler: [],       // <string[]> ('extension:module') require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: false,      // <boolean> fail if there are any undefined or pending steps
    tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 20000,     // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  before: () => {
    global.expect = chai.expect;
    chai.Should();

    return pactProvider.start();
  },
  after: () => {
    return pactProvider.stop();
  },
  afterFeature: () => {
    return pactProvider.reset();
  }
};
