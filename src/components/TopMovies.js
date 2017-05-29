import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';

import Movie from './Movie';

class TopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, movies: [] };
  }

  componentWillMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    const movies = [];
    this.props.names.map(name => {
      axios.get('http://www.omdbapi.com', {
        params: {
          t: name,
          plot: 'short',
          r: 'json',
          apikey: '8571c3ab'
        }
      }
      ).then(response => {
        const data = {
          title: response.data.Title,
          director: response.data.Director,
          id: response.data.imdbID,
          image: response.data.Poster
        };
        movies.push(data);
        this.setState({ loading: false, movies: movies });
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          loading
        </div>
      </div>);
    }

    const movies = this.state.movies.map((movie, i) => {
      return (<Movie movie={movie} key={i} />);
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          {movies}
        </div>
      </div>
    );
  }
}

TopMovies.propTypes = {
  names: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default TopMovies;
