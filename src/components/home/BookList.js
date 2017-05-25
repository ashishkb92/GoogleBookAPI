import React,{PropTypes} from 'react';

import axios from 'axios';



  class BookList extends React.Component{

    setFirstLoad(){
      if (this.props.firstLoad){
        this.props.setFirstLoad();
      }

    }
    render(){

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

        if (this.props.books.length === 0 && this.props.firstLoad){
          return (<div>Please fill something in the Search bar so that we can help you to see some books of your choice</div>)
        }else if (this.props.books.length === 0 ) {
          return(<div>We are really sorry , but the book you are looking for is not present</div>);
        }else{
          return(
            <div>
              <table className="table table-striped table-hover">
                  <thead>
                  <tr>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Authors</th>
                      <th>Publication Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {bookArr()}
                  </tbody>
              </table>
            </div>
          );

        }




}


}



export default BookList;
