import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './layout/App';
import ImdbPage from './pages/ImdbPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ImdbPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
