import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import BookDetail from './components/detail/BookDetail';


export default (
  <Route path = '/' component = {App}>
    <Route path = "bookdetails" component ={BookDetail}></Route>
  </Route>
);
