import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';

const App = (props) => {
  return (
    <div>
      <IndexLink to="/">Home</IndexLink>
      <br />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
