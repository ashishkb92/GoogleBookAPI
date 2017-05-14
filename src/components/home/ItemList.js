import React,{PropTypes} from 'react';
import Item from './Item';
import axios from 'axios';



  class ItemList extends React.Component{

    handleLoadMore(){
      if (this.props.count>0){
        this.props.onLoadMore();
      }

    }

    render(){

      var renderList = this.props.items.map((item,i)=>{
        var style ={width:'100%'};

        var {mrp, title, sku, stock, subcategory, thumbnail} = item;
        var stockColor;
         stock === 'Out Of Stock' ? stockColor = "label label-danger" : stockColor = "label label-success";


        return(
          <div key = {i} className = "jumbotron">
             <div className="row">
               <div className="col-md-8">
               <span className={stockColor}>&nbsp;&nbsp;&nbsp;</span><span><b>&nbsp;&nbsp;&#8377;&nbsp;{mrp}</b> </span>
               <br/>
               <br/>
               {title}
               <br/>
               #{sku}
               <br/>
               <br/>
               {subcategory}
               </div>
               <div className="col-md-4">

                    <img src={thumbnail} alt={title} width="204" height="106" className= "img-responsive" />

               </div>

              </div>

          </div>
        )
      })
      return (
        <div  style = {{width:'450px', margin:'0 auto'}}>
          {renderList}
          <div className ="text-center" >
            <button className = 'btn' onClick = {this.handleLoadMore.bind(this)} >{`${this.props.count} BUNDLE(S) LEFT`}</button>
          </div>

        </div>
      )
    }


}

export default ItemList;
