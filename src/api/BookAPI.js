
export const filteredBooks= (books=[],orderBy,sortBy)=>{
    let filteredBooks = [...books];

     if (orderBy === "title"){
        filteredBooks.sort(function(a,b){
          let x = a.volumeInfo.title.toLowerCase();
          let y = b.volumeInfo.title.toLowerCase();
          if(x<y){return -1;}
          if(x>y){return 1;}
          return 0;
        });

        return sortBy === "asc" ? filteredBooks : filteredBooks.reverse();
     }

     if (orderBy === "subtitle"){
        filteredBooks.sort(function(a,b){
          let x = (typeof a.volumeInfo.subtitle === "undefined")? " " : a.volumeInfo.subtitle.toLowerCase();
          let y = (typeof b.volumeInfo.subtitle === "undefined")? " " : b.volumeInfo.subtitle.toLowerCase();
          if(x<y){return -1;}
          if(x>y){return 1;}
          return 0;
        });

        return sortBy === "asc" ? filteredBooks : filteredBooks.reverse();
     }


     if (orderBy === "authors"){
        filteredBooks.sort(function(a,b){
          let x = (typeof a.volumeInfo.authors === "undefined")?"":a.volumeInfo.authors.join("").toLowerCase();
          let y = (typeof b.volumeInfo.authors === "undefined")?"":b.volumeInfo.authors.join("").toLowerCase();
          if(x<y){return -1;}
          if(x>y){return 1;}
          return 0;
        });

        return sortBy === "asc" ? filteredBooks : filteredBooks.reverse();
     }

     if (orderBy === "publishedDate"){
        filteredBooks.sort(function(a,b){
          let x = a.volumeInfo.publishedDate||"";
          let y = b.volumeInfo.publishedDate||"";
          if(x<y){return -1;}
          if(x>y){return 1;}
          return 0;
        });

        return sortBy === "asc" ? filteredBooks : filteredBooks.reverse();
     }

  return filteredBooks;

};
