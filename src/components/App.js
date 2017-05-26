import React,{PropTypes} from 'react';
import Search from './home/Search';
import axios from 'axios';
import * as BookAPI from '../api/BookAPI';
import BookList from './home/BookList';
import {browserHistory} from 'react-router';
import BookDetail from './detail/BookDetail';


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
        page : 1,
        bookClicked : {},
        bookDetails : false
      };

      this.handleSearch = this.handleSearch.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleBookFetch = this.handleBookFetch.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleSort  = this.handleSort.bind(this);
      this.handleClickBook = this.handleClickBook.bind(this);
      this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleSearch(searchTerm,startIndex,maxResults,page){
        this.setState({
          searchTerm,
          startIndex,
          maxResults,
          page
        });

        this.handleBookFetch(searchTerm,startIndex,maxResults);
    }

    handleChange(maxResults){
      this.setState({maxResults});
      this.handleBookFetch(undefined,undefined,maxResults);
    }

    handleChangePage(startIndex,page){
      this.setState({startIndex,page});
      this.handleBookFetch(undefined,startIndex,undefined);
    }

    handleSort(orderBy,sortBy){
      let books = BookAPI.filteredBooks(this.state.books,orderBy,sortBy);
      this.setState({books});
    }

    handleClickBook(book){
      this.setState({
        bookClicked:book,
        bookDetails : true
      });
    }

    handleGoBack(){
      this.setState({
        bookClicked : {},
        bookDetails : false
      });
    }

    handleBookFetch(searchTerm=this.state.searchTerm,startIndex=this.state.startIndex,maxResults=this.state.maxResults){
      this.setState({loading:true});
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`).then((res)=>{

        if (res.data.totalItems === 0){

          this.setState({
            books:[],
            loading :false,
            totalBooks : res.data.totalItems,
            firstLoad : false,
            errorMessage : ""
          });

        }else{

          this.setState({
            books:[...res.data.items],
            loading :false,
            totalBooks : res.data.totalItems,
            firstLoad : false,
            errorMessage : ""
          });

        }
      }).catch((error)=>{

        if(error.response === undefined){

          this.setState({
            books : [],
            errorMessage : error.message,
            loading : false,
            totalBooks : 0,
            firstLoad : false
          });

        }else{

          this.setState({
            books : [],
            errorMessage : error.response.data.error.message,
            loading : false,
            totalBooks : 0,
            firstLoad : false
          });
        }

      });
    }




  render(){
    let {books, searchTerm, loading, firstLoad, errorMessage ,maxResults, page, totalBooks,bookDetails,bookClicked } = this.state;

    let LoadOrNot = ()=>{
    if (loading === true){
      return (
        <div className = "text-center" style = {{fontSize : '20px',color : 'blue'}}>
          Please wait while we load books for you :)
         </div>
       );
    }else{
      return(
          <BookList
            books = {books}
            firstLoad = {firstLoad}
            errorMessage = {errorMessage}
            page = {page}
            per_page = {maxResults}
            totalBooks = {totalBooks}
            onChange = {this.handleChange}
            onSort= {this.handleSort}
            onChangePage = {this.handleChangePage}
            onClickBook = {this.handleClickBook} />
      );
    }
  };
    if (bookDetails===true){
      return(
        <div className="container">
          <BookDetail
            book = {bookClicked}
            onGoBack = {this.handleGoBack} />
        </div>

    );
    }else{
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


}



export default App;
