import React,{PropTypes} from 'react';
import axios from 'axios';
import {Pagination} from 'react-bootstrap';



  class BookList extends React.Component{

    constructor(props){
      super(props);

      this.state={
        sortBy : "desc"
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleSort = this.handleSort.bind(this);
      this.handleClickBook = this.handleClickBook.bind(this);
    }

    handleChange(){
      this.props.onChange(Number(this.refs.per_page.value));
    }

    handleChangePage(page){
      let startIndex = (page-1)*this.props.per_page;
      this.props.onChangePage(startIndex,page);
    }

    handleSort(orderBy){
      if (this.state.sortBy === "asc"){
        this.setState({sortBy : "desc"});
      }else {
        this.setState({sortBy : "asc"});
      }


      this.props.onSort(orderBy, this.state.sortBy );
    }

    handleClickBook(book){
      this.props.onClickBook(book);
    }

    render(){
      const {page,per_page, totalBooks} = this.props;
      const pages = Math.ceil(totalBooks / per_page);

      const bookArr = ()=>{
        return(
          this.props.books.map((book)=>{

             const {title, subtitle, authors, publishedDate} = book.volumeInfo;

             return (
                <tr key = {book.id}  onClick = {()=>this.handleClickBook(book)}>
                  <td>{title}</td>
                  <td>{subtitle}</td>
                  <td>{(typeof authors === "undefined") ? " " : authors.join(", ")}</td>
                  <td>{publishedDate}</td>
                </tr>

             );
         })
       );
     };

        if(this.props.errorMessage.length > 0 ){
          return (<div className = "text-center" style = {{fontSize : '20px',color : 'red'}}> {this.props.errorMessage}</div>);
        }else if (this.props.books.length === 0 && this.props.firstLoad){
          return (<div className = "text-center" style = {{fontSize : '20px',color : 'green'}}>Please fill something in the search bar so that we can help you to see some books of your choice</div>);
        }else if (this.props.books.length === 0 ) {
          return(<div className = "text-center" style = {{fontSize : '20px',color : 'red'}}>We are really sorry , but the book you are looking for is not present. Please search other books,  </div>);
        }else{
          return(
            <div>
              <table className="table table-responsive table-bordered table-hover">
                  <thead>
                  <tr>
                      <th onClick = {()=>this.handleSort("title")} >Title</th>
                      <th onClick = {()=>this.handleSort("subtitle")} >Subtitle</th>
                      <th onClick = {()=>this.handleSort("authors")} >Authors</th>
                      <th onClick = {()=>this.handleSort("publishedDate")} >Publication Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {bookArr()}
                  </tbody>
              </table>
              <select ref = "per_page" onChange = {this.handleChange} value = {per_page}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
              <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10}  next prev  items={pages} activePage={page} onSelect={this.handleChangePage} />
            </div>
          );

        }

}


}

BookList.propTypes={
  onChange : React.PropTypes.func.isRequired,
  per_page : React.PropTypes.number.isRequired,
  onChangePage : React.PropTypes.func.isRequired,
  onSort : React.PropTypes.func.isRequired,
  onClickBook : React.PropTypes.func.isRequired,
  page : React.PropTypes.number.isRequired,
  totalBooks : React.PropTypes.number.isRequired,
  errorMessage : React.PropTypes.string.isRequired,
  firstLoad : React.PropTypes.bool.isRequired,
  books : React.PropTypes.array.isRequired
};



export default BookList;
