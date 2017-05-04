/* global browser */
const pactProvider = require('../support/pactProvider');

module.exports = function steps() {
  this.Given(/^I open the movie application page$/, () => {
    pactProvider.addInteraction({
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

    browser.url('http://localhost:3000');
    browser.getTitle().should.equal('OMDb API React Example');
  });

  this.When(/^I search for the Titanic movie$/, () => {
    browser.setValue('[data-automation-id=search-field]', 'titanic');
  });

  this.Then(/^I expect that one movie result is returned$/, () => {
    browser.click('[data-automation-id=search-button]');
    browser
      .getAttribute('[data-automation-id=movie-search] [data-automation-id=movie]', 'data-meta-data')
      .should.be.equal('Titanic1234');
  });
};
