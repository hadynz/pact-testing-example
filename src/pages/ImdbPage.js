import React, { Component } from 'react';

import TopMovies from '../components/TopMovies';
import SearchMovies from '../components/SearchMovies';

class ImdbPage extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <SearchMovies />
        <TopMovies names={['Blade runner', 'indiana jones', 'Star Wars: Episode VII - The Force Awakens']} title="Top 3 Harrison Ford movies" />
        <TopMovies names={['Rambo', 'Cobra', 'Rocky']} title="Top 3 Stallone movies" />
      </div>
    );
  }
}

export default ImdbPage;
