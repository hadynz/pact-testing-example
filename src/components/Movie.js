import React, { PropTypes } from 'react';

const Movie = (props) => {
  return (
    <div className="col-xs-4">
      <img src={props.movie.image} />
      <h1>{props.movie.title} </h1>
      <p>{props.movie.director}</p>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired
};

export default Movie;
