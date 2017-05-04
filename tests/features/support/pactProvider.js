const path = require('path');
const pact = require('pact');

const PACT_SERVER_PORT = 4012;

const provider = pact({
  port: PACT_SERVER_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  logLevel: 'INFO',
  consumer: 'MyConsumer',
  provider: 'MyProvider'
});

module.exports = {
  start: () => {
    return provider.setup();
  },
  stop: () => {
    return provider.finalize();
  },
  reset: () => {
    return provider.removeInteractions();
  },
  addInteraction: interaction => {
    return provider.addInteraction(interaction);
  }
};
