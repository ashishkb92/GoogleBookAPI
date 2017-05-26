import React,{PropTypes} from 'react';

import axios from 'axios';

import {Pagination} from 'react-bootstrap';



  class BookList extends React.Component{

    constructor(props){
      super(props);
      this.state={
        sortBy : "desc"
      }
    }

    handleChange(){
      debugger;
      this.props.onChange(Number(this.refs.per_page.value));
    }

    handleChangePage(page){
      var startIndex = (page-1)*this.props.per_page;
      this.props.onChangePage(startIndex,page);
    }

    handleSort(orderBy){
      if (this.state.sortBy === "asc"){
        this.setState({sortBy : "desc"})
      }else {
        this.setState({sortBy : "asc"})
      }


      this.props.onSort(orderBy, this.state.sortBy );
    }

    render(){
      var {page,per_page, totalBooks} = this.props;
      const pages = Math.ceil(totalBooks / per_page);
      const bookArr = ()=>{
        return(
          this.props.books.map((book)=>{
             return (
                <tr key = {book.id}  >
                  <td>{book.volumeInfo.title}</td>
                  <td>{book.volumeInfo.subtitle}</td>
                  <td>{(typeof book.volumeInfo.authors === "undefined") ? " " : book.volumeInfo.authors.join(", ")}</td>
                  <td>{book.volumeInfo.publishedDate}</td>
                </tr>

             );
         })
       )
      }
        if(this.props.errorMessage.length > 0 ){
          return <div> {this.props.errorMessage }</div>
        }else if (this.props.books.length === 0 && this.props.firstLoad){
          return (<div>Please fill something in the Search bar so that we can help you to see some books of your choice</div>)
        }else if (this.props.books.length === 0 ) {
          return(<div>We are really sorry , but the book you are looking for is not present</div>);
        }else{
          return(
            <div>
              <table className="table table-responsive table-bordered table-hover">
                  <thead>
                  <tr>
                      <th onClick = {this.handleSort.bind(this,"title")} >Title</th>
                      <th onClick = {this.handleSort.bind(this,"subtitle")} >Subtitle</th>
                      <th onClick = {this.handleSort.bind(this,"authors")} >Authors</th>
                      <th onClick = {this.handleSort.bind(this,"publishedDate")} >Publication Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {bookArr()}
                  </tbody>
              </table>
              <select ref = "per_page" onChange = {this.handleChange.bind(this)} value = {per_page}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
              <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10}  next prev  items={pages} activePage={page} onSelect={this.handleChangePage.bind(this)} />
            </div>
          );

        }




}


}



export default BookList;
