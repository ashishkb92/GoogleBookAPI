import React from "react";

class BookDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack(){
    this.props.onGoBack();
  }

  render(){

    const {title, subtitle, authors, publisher, publishedDate, imageLinks, description} = this.props.book.volumeInfo;

    return(
      <div>
        <div className = "jumbotron">
         <h1 style = {{fontSize:"40px" ,lineHeight :"13px"}} >{title}</h1>
         <h2 style = {{fontSize:"30px"}} >{subtitle}</h2>
         <h3 style = {{fontSize:"25px"}} > by {(typeof authors === "undefined") ? " " : authors.join(", ")}</h3>
         <br/>
         <p style = {{fontSize:"20px",lineHeight :"13px"}} >Publishers : {publisher}</p>
         <p style = {{fontSize:"20px", lineHeight: "13px"}} >Date of Publication : {` ${publishedDate}`}</p>
         <img src={(typeof imageLinks === "undefined")?"":imageLinks.thumbnail} alt={title} width="204" height="106" className= "img-responsive" style = {{float :"left" , margin:"20px"}} />
         <p style = {{fontSize:"18px"}}>{description}</p>
         <p style = {{clear:"both"}}></p>
        </div>
        <div>
          <button className = "btn btn-primary " onClick = {this.handleGoBack} style = {{margin :"20px auto",display :"block"}}>Back to Search</button>
        </div>
      </div>
    );
  }
}

BookDetail.propTypes={
  onGoBack : React.PropTypes.func.isRequired,
  book : React.PropTypes.object.isRequired
};

export default BookDetail;
