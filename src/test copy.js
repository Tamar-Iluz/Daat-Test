import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import './css/ButtonDemo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';

//1

 function getAllCatering() {
 var a=[];
  return fetch("angular_react_Response.json")

      .then(response => {
          if (response.ok && response.status == 204)
              alert("שגיאה!!!")
          if (response.ok)
              return response.json();
          else
              throw new Error(response.status)
      })
      .then(data => 
        {console.log(data,"data")
        a=data;
        console.log(a,"a")
         return  a;
         
      })
      .catch(err => console.log(err))
}
   
//2
export default function GetByType2() {

  const [dataFromFile, setDataFromFile] = useState(getAllCatering().then(aaa=>console.log(aaa,"aaa")))
  
  console.log( JSON.stringify(dataFromFile),"datafrom file")
  const counts = {};
  function compare(a, b) {
    if (a.Type < b.Type) {
      return -1;
    }
    if (a.Type > b.Type) {
      return 1;
    }
    return 0;
  }
  return (

    <div>
      {console.log(dataFromFile)}
      {[...dataFromFile]
        .sort(compare)
        .map(dataFromFile => {
            counts[dataFromFile.Type] = (counts[dataFromFile.Type] || 0) + 1; 
            {console.log(dataFromFile,"after sort and map")}
          return (
            <div key={dataFromFile.imdbID}>
              <h5>Title: {dataFromFile.Title}</h5>
              <h5>Year: {dataFromFile.Year}</h5>
              <h5>imdbID: {dataFromFile.imdbID}</h5>
              <h5>Type: {dataFromFile.Type}</h5>
              <h5>Poster: {dataFromFile.Poster}</h5>
              <hr />
            </div>
          );
        })}{console.log( counts )}
        ------------------------------------------------------
        <GetByTabs CountAndType={counts}/>
    </div>
  );
}

// 3
export  function GetByTabs(props) {
const [countAndType,setCountAndType]= useState(props.CountAndType);

  return (
    <div>
      <TabView>
      {countAndType.map(d=>
        <TabPanel header={d}>
          
        </TabPanel>)}
      </TabView>
    </div>
  )
}
//4



 export  function  DataTableGridLinesDemo () {
    const [products, setProducts] = useState(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <DataTable value={products} header="Header" footer="Footer" showGridlines responsiveLayout="scroll">
                    <Column field="Title" header="Title"></Column>
                    <Column field="Year" header="Year"></Column>
                    <Column field="imdbID" header="imdbID"></Column>
                    <Column field="Type" header="Type"></Column>
                    <Column field="Poster" header="Poster"></Column>
                </DataTable>
            </div>
        </div>
    );
}
