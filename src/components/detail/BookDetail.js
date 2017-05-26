import React from "react";

class BookDetail extends React.Component{
  constructor(props){
    super(props);

  }

  handleGoBack(){
    this.props.onGoBack();
  }
  render(){
    var {book} = this.props;
    debugger;
    return(
      <div>
        <div className = "jumbotron">
         <h1>{book.volumeInfo.title}</h1>
         <h2>{book.volumeInfo.subtitle}</h2>
         <h3>{(typeof book.volumeInfo.authors === "undefined") ? " " : book.volumeInfo.authors.join(", ")}</h3>
         <br/>
         <p>Publishers : {book.volumeInfo.publisher},</p>
         <p>Date of Publication : {` ${book.volumeInfo.publishedDate}`}</p>
         <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} width="204" height="106" className= "img-responsive" style = {{float :"left" , margin:"20px"}} />
         <p>{book.volumeInfo.description}</p>
         <p style = {{clear:"both"}}></p>
        </div>
        <div>
          <button className = "btn btn-primary " onClick = {this.handleGoBack.bind(this)} style = {{margin :"20px auto",display :"block"}}>Back to Search</button>
        </div>
      </div>
    );
  }
}

export default BookDetail;
