import React from 'react';
import {Link} from 'react-router';

class Search extends React.Component {

  handleSearch(e){
    e.preventDefault();
    this.props.onSearch(this.refs.seachTerm.value);
    debugger;
  }



  render(){
    var searchPlaceHolder = `Which book will you like to search today ?`
    return(
      <form onSubmit= {this.handleSearch.bind(this)}>
        <div className = "jumbotron" >
            <div className="input-group">
              <input className="form-control" ref ="seachTerm" placeholder={searchPlaceHolder} required  />
              <span className="input-group-btn">
                <button  type = "submit" className="btn btn-default">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </span>
           </div>

        </div>
      </form>
    );
  }
}

export default Search;
