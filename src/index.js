import 'babel-polyfill';
import React  from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory , Route, Link } from 'react-router';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';



ReactDom.render(
    <Router history = {browserHistory} >
      <Route path = "/" component = {App}/>
    </Router>,
  document.getElementById('app')
);
