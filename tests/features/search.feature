Feature: Test movie search
    As a user
    I want to be able to search for movies

    Background:
        Given That a user accesses arrives at our amazing app’s homepage

    Scenario: Searching for a movie
        When  I search for a movie that is available in the movie api
        Then  I expect that the matching movie result is returned
