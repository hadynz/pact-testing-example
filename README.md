# pact-testing-example

[![Build Status](https://travis-ci.org/hadynz/pact-testing-example.svg?branch=master)](https://travis-ci.org/hadynz/pact-testing-example)

An example React app with [component integration tests][4] that demonstrate [Consumer Driven Contract][3] in practice.

This example uses the following stack for testing:

* [PactJS][5] - A JavaScript implementation of the [Pact][6] spec that is used with the tests to guarantee that contract
 dependencies are satisfied
 * [Cucumber.js][7] - Testing interface that allows us to write plain English tests specs in Gherkin
 * [WebdriverIO][8] - Test runner abstraction on top of Selenium that allows us to write integration tests via the browser

## Getting Started

### Installing

Using `npm` with:

```bash
npm install
```

### Tests

Run the integration testsuite by:

```bash
npm run integration-test
```

## Credits

* This code was an original fork of [`react-imdb`][1]; a simple app that wraps the
 [The Open Movie Database][2] (OMDb API) and demonstrates searching of the api.

[1]: https://github.com/alepoletto/react-imdb
[2]: http://www.omdbapi.com/
[3]: https://martinfowler.com/articles/consumerDrivenContracts.html
[4]: https://martinfowler.com/articles/microservice-testing/#testing-component-introduction
[5]: https://github.com/pact-foundation/pact-js
[6]: https://github.com/pact-foundation/pact-specification
[7]: https://github.com/cucumber/cucumber-js
[8]: http://webdriver.io/
