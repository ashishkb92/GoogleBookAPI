import 'babel-polyfill';
import React  from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';


ReactDom.render(
    <Router history = {browserHistory} routes = {routes}/>,
  document.getElementById('app')
);
