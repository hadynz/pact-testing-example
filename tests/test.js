module.exports = {
  'Demo test': browser => {
    browser
      .url(browser.launchUrl)
      .pause(5000)
      .end();
  }
};
