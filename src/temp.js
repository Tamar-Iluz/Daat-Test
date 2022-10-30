import React, { useEffect, useState } from 'react';

var array = [
    {category:"sporting good",price:50,stocked:true,name:"Football"},
    {category:"sporting good",price:10,stocked:true,name:"baseball"},
    {category:"sporting good",price:25,stocked:false,name:"baskball"},
    {category:"electronies",price:70,stocked:true,name:"computer"},
    {category:"electronies",price:90,stocked:false,name:"lep top"},
    {category:"electronies",price:250,stocked:true,name:"phone"}
]

export default  function FilterableProductTable(){ 

    return(
        <div>
        <SearchBar/> 
        <ProductTable/>
      </div>
        )
}
function ProductTable(){
    return(
        <div>
            <h1>Name  price</h1>
            <ProductCategoryRow/>
            <ProductRow/></div>

        )
}
function SearchBar(){

    return(
        <div>
            <input type="text"></input>
            <input type="checkbox"></input>
        </div>
        )
}

function ProductCategoryRow(props){
    // const[sporting,setsporting]=useState("sporting good")
    var type=["sporting good", "electronies"];
     return(
        <div>
            {/* <h3>{sporting}</h3> */}
           <h3>{type[props]}</h3>
            {/* <h3>sporting good</h3>
            <h3>electronies</h3> */}
        </div>
        )

}

function ProductRow(){
   var a= <ProductCategoryRow p={0}/>
    return(
         <div>
             {array.map(course=>{
                 if(course.category==a)
            <div>category: {course.category}   price: {course.price} name: {course.name}  </div> } 
            )}
         </div>
    )
}

