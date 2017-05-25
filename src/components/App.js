import React,{PropTypes} from 'react';
import Search from './home/Search';
import axios from 'axios';
import * as BookAPI from '../api/BookAPI';
import BookList from './home/BookList';


class App extends React.Component{
  constructor(props){
    super(props);

      this.state = {
        books : [],
        totalBooks:0,
        startIndex:0,
        maxResults :10,
        loading:false,
        firstLoad : true,
        errorMessage : "",
        page : 1
      };

      this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(searchTerm,startIndex,maxResults,page){
      debugger;
      if(this.state.searchTerm != searchTerm){
        this.setState({
          searchTerm,
          startIndex,
          maxResults,
          page
        })
        this.handleBookFetch(searchTerm,startIndex,maxResults);
      }


    }

    handleChange(maxResults){
      this.setState({maxResults});
      this.handleBookFetch(undefined,undefined,maxResults);
    }

    handleChangePage(startIndex,page){
      this.setState({startIndex,page});
      this.handleBookFetch(undefined,startIndex,undefined)
    }

    handleBookFetch(searchTerm=this.state.searchTerm,startIndex=this.state.startIndex,maxResults=this.state.maxResults){
      this.setState({loading:true})
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`).then((res)=>{

        if (res.data.totalItems === 0){
          this.setState({

            books:[],
            loading :false,
            totalBooks : res.data.totalItems,
            firstLoad : false,
            errorMessage : ""
          })
        }else{
          this.setState({
            books:[...res.data.items],
            loading :false,
            totalBooks : res.data.totalItems,
            firstLoad : false,
            errorMessage : ""
          })
        }

      }).catch((error)=>{
        debugger;
        this.setState({
          books : [],
          errorMessage : error.message,
          loading : false,
          totalBooks : 0,
          firstLoad : false
        })
      })
    }




  render(){
    var {books, searchTerm, loading, firstLoad, errorMessage ,maxResults, page, totalBooks } = this.state;

  var LoadOrNot = ()=>{
    if (loading === true){
      return (<div> Please wait we are loading books you searched for :) </div>);
    }else{
      return(
          <BookList books = {books} firstLoad = {firstLoad}  errorMessage = {errorMessage} page = {page} per_page = {maxResults} totalBooks = {totalBooks} onChange = {this.handleChange.bind(this)} onChangePage = {this.handleChangePage.bind(this)}></BookList>
      );
    }
  }

    return(
      <div className = "container">
        <Search  onSearch= {this.handleSearch}   />
        <br></br>
        <div>
          {LoadOrNot()}
        </div>
      </div>
    );

  }


}



export default App;
