const chai = require('chai');
const path = require('path');
const pact = require('pact');

const webpackConfig = require('./webpack/webpack.integration-test.js');

const webpackDevServerPort = 3000;
const pactServerPort = 4012;

const provider = pact({
  port: pactServerPort,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  logLevel: 'INFO',
  consumer: 'MyConsumer',
  provider: 'MyProvider'
});

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
  baseUrl: `http://localhost:${webpackDevServerPort}`,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  webpackConfig: webpackConfig,
  webpackPort: webpackDevServerPort,
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

    return provider.setup();
  },
  after: () => {
    return provider.finalize();
  },
  beforeFeature: feature => {
    return provider
      .addInteraction({
        state: 'i have a list of projects',
        uponReceiving: 'a request for projects',
        withRequest: {
          method: 'GET',
          path: '/',
          query: {
            t: 'titanic',
            plot: 'short',
            r: 'json'
          },
          headers: {
            'Accept': 'application/json, text/plain, */*'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: {
            'Title': 'Titanic1234',
            'Year': '1997',
            'Rated': 'PG-13',
            'Released': '19 Dec 1997',
            'Runtime': '194 min',
            'Genre': 'Drama, Romance',
            'Director': 'James Cameron',
            'Writer': 'James Cameron',
            'Actors': 'Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates',
            'Plot': 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
            'Language': 'English, Swedish',
            'Country': 'USA',
            'Awards': 'Won 11 Oscars. Another 110 wins & 74 nominations.',
            'Poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
            'Ratings': [
              {
                'Source': 'Internet Movie Database',
                'Value': '7.7/10'
              },
              {
                'Source': 'Rotten Tomatoes',
                'Value': '88%'
              },
              {
                'Source': 'Metacritic',
                'Value': '74/100'
              }
            ],
            'Metascore': '74',
            'imdbRating': '7.7',
            'imdbVotes': '838,917',
            'imdbID': 'tt0120338',
            'Type': 'movie',
            'DVD': '10 Sep 2012',
            'BoxOffice': 'N/A',
            'Production': 'Paramount Pictures',
            'Website': 'http://www.titanicmovie.com/',
            'Response': 'True'
          }
        }
      });
  },
  afterFeature: () => {
    return provider.removeInteractions();
  }
};
