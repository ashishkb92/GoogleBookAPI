import React,{PropTypes} from 'react';
import Search from './home/Search';
import axios from 'axios';
import * as ItemAPI from '../api/ItemAPI';
import ItemList from './home/ItemList';


class App extends React.Component{
  constructor(props){
    super(props);

      this.state = {
        items : [],
        sort  : false,
        initialCount:0,
        pageNumber:1,
        searchTerm : '',

        loading:true
      };
    }

    handleSearch(searchTerm){

      this.setState({searchTerm})

    }

    handleSort(){
        this.setState({sort : !this.state.sort})
    }

    handleLoadMore(){
      if (this.state.loading === false){
        this.setState({loading:true});
        var pageNumber = this.state.pageNumber+1;

        var URI = `http://api.dataweave.com/v1/priceintelligence_api_test/fetchBundlesAll/?api_key=8034178a60ee3eb70d8d5ab27a561485&bundle=all&per_page=20&page=${pageNumber}&more=1`
        axios.get(URI).then((response)=>{
          var initialData = response.data.data;
          var itemobject;

          var items = initialData.map((element)=>{
                for (var i in element ){
                  return element[i][0];
                }
          })


          this.setState({
            items:[
              ...this.state.items,
              ...items
            ],
            loading :false,
            pageNumber,


          })

        })

      }

    }


  render(){
    var {items, searchTerm, sort } = this.state;

    var count = this.state.initialCount - items.length;
    var filteredItems = ItemAPI.filteredItems(items, searchTerm, sort);
    return(
      <div className = "container">
        <Search onSort= {this.handleSort.bind(this)} onSearch= {this.handleSearch.bind(this)} initialCount ={this.state.initialCount}  />
        <br></br>
        <ItemList items = {filteredItems} onLoadMore = {this.handleLoadMore.bind(this)} count ={count}  />
      </div>
    );
  }

  componentDidMount(){
    const URI = "http://api.dataweave.com/v1/priceintelligence_api_test/fetchBundlesAll/?api_key=8034178a60ee3eb70d8d5ab27a561485&bundle=all&per_page=20&page=1&more=1"
    axios.get(URI).then((response)=>{
      var initialData = response.data.data;
      var itemobject;
      var items = initialData.map((element)=>{
            for (var i in element ){
              return element[i][0];
            }
      })
      if (items.length>0){
        this.setState({
          initialCount: response.data.count,
          loading : false,
          items
        })

      }

    })
  }
}



export default App;
