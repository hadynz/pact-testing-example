const chromedriver = require('chromedriver');

module.exports = {
  asyncHookTimeout: 15000,

  before: done => {
    chromedriver.start();
    done();
  },

  after: done => {
    chromedriver.stop();
    done();
  }
};
