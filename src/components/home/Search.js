import React from 'react';
import {Link} from 'react-router';

class Search extends React.Component {

  handleSearch(){
    this.props.onSearch(this.refs.seachTerm.value);
  }

  handleSort(){
    this.props.onSort();
  }

  render(){
    var searchPlaceHolder = `Search from ${this.props.initialCount} bundle(s)`
    return(
      <div className = "jumbotron" >
          <div className="input-group">
            <input className="form-control" ref ="seachTerm" placeholder={searchPlaceHolder} required onChange = {this.handleSearch.bind(this)} />
                 <span className="input-group-btn">
                      <button  className="btn btn-default">
                        <i className="glyphicon glyphicon-search"></i>
                      </button>
                      <button  className="btn btn-default" onClick = {this.handleSort.bind(this)}>
                        <i className="glyphicon glyphicon-sort"></i>
                      </button>
                      <button  className="btn btn-default">
                        <i className="glyphicon glyphicon-arrow-down"></i>
                      </button>
                  </span>
         </div>

      </div>
    );
  }
}

export default Search;
