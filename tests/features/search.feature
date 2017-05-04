Feature: Test movie search
    As a user
    I want to be able to search for movies

    Background:
        Given I open the movie application page

    Scenario: Searching for a movie
        When  I search for the Titanic movie
        Then  I expect that one movie result is returned
