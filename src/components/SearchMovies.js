import React, { Component } from 'react';
import * as axios from 'axios';

import Movie from './Movie';

class SearchMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {lastMovie: {}, name: 'point break'};
  }

  searchMovie = (name) => {
    axios.get('http://www.omdbapi.com', {
      params: {
        t: name,
        plot: 'short',
        r: 'json'
      }
    }
    ).then(response => {
      const data = {
        title: response.data.Title,
        director: response.data.Director,
        id: response.data.imdbID,
        image: response.data.Poster
      };
      this.setState({lastMovie: data});
    });
  };

  handleChange = (event) => {
    this.setState({name: event.target.value});
  };

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Last Movie that you Watched</h3>
        </div>
        <div className="panel-body">
          <div className="col-xs-4" >
            <div className="form-group">
              <label htmlFor="title">Search by Title</label>
              <input type="text" className="form-control" id="title" placeholder="Title" onChange={this.handleChange} />
              <input className="btn-primary" type="submit" value="search" onClick={() => this.searchMovie(this.state.name)} />
            </div>
          </div>
          <Movie movie={this.state.lastMovie} />
        </div>
      </div>
    );
  }
}

export default SearchMovies;
