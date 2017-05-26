import React from 'react';
import {Link} from 'react-router';

class Search extends React.Component {

  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e){
    e.preventDefault();
    this.props.onSearch(this.refs.seachTerm.value,0,10,1);
  }

  render(){
    let searchPlaceHolder = `Which book will you like to search today ?`;
    return(
      <form onSubmit= {(e)=>this.handleSearch(e)}>
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

Search.propTypes={
  onSearch : React.PropTypes.func.isRequired
};

export default Search;
