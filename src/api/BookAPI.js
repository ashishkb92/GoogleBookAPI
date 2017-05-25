import _ from 'underscore';


export var filteredItems= (items=[],searchTerm,sort)=>{

  var filteredItems = items;
  filteredItems = filteredItems.filter((item)=>{
      var text = item.title.toLowerCase();
      return searchTerm.length === 0 || text.indexOf(searchTerm.toLowerCase())>-1;

    });

    if(sort){

      filteredItems = _(filteredItems).sortBy(function(obj) {
        if (parseInt(obj.available_price)){
          return parseInt(obj.available_price)
        }else{
          return -1;
        }

       }
      );


    }

  return filteredItems;

};
