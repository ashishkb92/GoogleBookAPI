import React,{PropTypes} from 'react';



     var Item = (props)=>{
  var {mrp, title, sku, stock, subcategory, thumbnail} = props.item;
  var stockColor;
   stock === 'Out Of Stock' ? stockColor = "bg-warning" : stockColor = "bg-success";
  return (
    <div className = "jumbotron">
       <div className="row">
         <div className="col-md-8">
         <span className={stockColor}>&nbsp;&nbsp;&nbsp;</span><span> Rs. {mrp}</span>
         </div>
         <div className="col-md-4">
           <a href="#" className="thumbnail">
              <img src={thumbnail} alt="..." />
            </a>
         </div>

        </div>

    </div>
  );
};


export default Item;
