import 'babel-polyfill';
import React  from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory , Route, Link } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import App from './components/App';
import BookDetail from './components/detail/BookDetail';


debugger;
ReactDom.render(
    <Router history = {browserHistory} >
      <Route path = '/' component = {App}>
        <Route path = "bookdetails" component ={BookDetail}></Route>
      </Route>
    </Router>,
  document.getElementById('app')
);
