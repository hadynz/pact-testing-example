/* global browser */
module.exports = function steps() {
  this.Given(/^I open the movie application page$/, () => {
    browser.url('http://localhost:3000');
    browser.getTitle().should.equal('OMDb API React Example');
  });

  this.When(/^I search for the Titanic movie$/, () => {
    browser.setValue('[data-automation-id=search-field]', 'titanic');
  });

  this.Then(/^I expect that one movie result is returned$/, () => {
    browser.click('[data-automation-id=search-button]');
    browser.pause(5000);
  });
};
