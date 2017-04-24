const path = require('path');
const pact = require('pact');

const provider = pact({
  port: 4010,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  consumer: 'MyConsumer',
  provider: 'MyProvider'
});

module.exports = {
  before: (browser, done) => {
    provider.setup().then(done).catch(done);
  },

  after: (browser, done) => {
    provider.finalize().then(done).catch(done);
  },

  beforeEach: (browser, done) => {
    provider
      .addInteraction({
        state: 'i have a list of projects',
        uponReceiving: 'a request for projects',
        withRequest: {
          method: 'GET',
          path: '/projects',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: { hello: 'world' }
        }
      })
      .then(done)
      .catch(done);
  },

  'Demo test': (browser) => {
    browser
      .url(browser.launchUrl)
      .pause(1000)
      .end();
  }
};
