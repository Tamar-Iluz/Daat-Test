import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import './css/ButtonDemo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { ToggleButton } from 'primereact/togglebutton';
import { AutoComplete } from 'primereact/autocomplete';
import TextField from "@mui/material/TextField";
//1
export default function Getfromfile() {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('angular_react_Response.json')
      response = await response.json()
      setData(response.results)
    }
    fetchMyAPI();
  }, [])
  return (
    <div>
      {JSON.stringify(data)}
      <br />
      ------------------------------------------------------------
      <br />
      {data.length > 0 ?
        <div>
        <ToggleButtonDemo dataFromFile={data}/>
        {/* <AutoCompleteDemo  dataFromFile={data}/> */}
        </div> :
        <div></div>}
    </div>
  )
}


//2
export  function GetByType(props) {
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);

  // useEffect(async () => {
  //   await  fetch("angular_react_Response.json")
  
  //   .then(response => {
  //     if (response.ok && response.status == 204)
  //       alert("שגיאה!!!")
  //     if (response.ok)
  //       return response.json();
  //     else
  //       throw new Error(response.status)
  //   })
  //   .then(data => { 
  //     setDataFromFile(data);  
  //     console.log(dataFromFile, "dataFromFile22222");
  //     console.log(data, "data222");
  //     return data;
  //   })
  //   .catch(err => console.log(err))
  //   }, []);


  // const [countsAndType,setCountsAndType] = useState([]);
  // const [curentCountsAndType,setCurentCountsAndType] = useState([]);
  const counts = [];

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
      {[...dataFromFile]
        .sort(compare)
        .map(dataFromFile => {
          counts[dataFromFile.Type] = (counts[dataFromFile.Type] || 0) + 1;
          // setCurentCountsAndType(...dataFromFile,curentCountsAndType.Type=dataFromFile.Type);
          // setCurentCountsAndType(...dataFromFile,curentCountsAndType.Count=(countsAndType[dataFromFile.Type] || 0) + 1);
          // countsAndType[dataFromFile.Type] = (countsAndType[dataFromFile.Type] || 0) + 1; 

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
        })

      }

      {/* {setCountsAndType(...countsAndType,curentCountsAndType)} */}
      {console.log(counts)}
      ------------------------------------------------------
      {dataFromFile.length > 0 ?
        <div>

          {/* <GetByTabs CountAndType={counts} /> */}
          {/* DataFromFile={dataFromFile} */}
        </div> :
        <div></div>}
    </div>
  );
}

// 3
export function GetByTabs(props) {
  const [countAndType, setCountAndType] = useState(props.CountAndType);
  const [dataFromFile, setDataFromFile] = useState(props.DataFromFile);
  return (
    <div>
      {console.log(countAndType)}
      <TabView>
        {countAndType.Type.map(c =>
          <TabPanel header={c}>
            {/* {dataFromFile.map(d=>
          d.Type == c.name?
          <div>id: {d.id},
           Type: {d.Type} 
          </div>:
          <div></div>
          )} */}
          </TabPanel>)}
      </TabView>
    </div>
  )
}
//4
export function ToggleButtonDemo(props) {
  const [checked2, setChecked2] = useState(false);
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);

  return (
    <div>
      <div className="card">
        <ToggleButton checked={checked2} onChange={(e) => setChecked2(e.value)} onLabel="Grid" offLabel="List" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />                </div>
      {checked2 ?
        <div>
          <Grid dataFromFile={dataFromFile}/>
        </div> :
        <div>
          <GetByType dataFromFile={dataFromFile}/>
        </div>}
    </div>
  );
}
export function Grid(props) {
  const [products, setProducts] = useState(null);
  const productService = new ProductService();
  const [dataFromFile,setDataFromFile] = useState(props.dataFromFile);

//   useEffect(() => {
//     getProductsSmall().then(data => setProducts(data));
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//  function getProductsSmall() {
//     return fetch('angular_react_Response.json').then(res => res.json()).then(d => d.data);
// }

  return (
    <div>
      <div className="card">
        <DataTable value={dataFromFile}  showGridlines responsiveLayout="scroll">
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
//5

// export   function AutoCompleteDemo  (props)  {

//     const [countries, setCountries] = useState(props.dataFromFile);
//     const [selectedCountry1, setSelectedCountry1] = useState(null);
//     const [filteredCountries, setFilteredCountries] = useState(null);

//      const searchCountry = (event) => {
//         setTimeout(() => {
//             let _filteredCountries;
//             if (!event.query.trim().length) {
//                 _filteredCountries = [...countries];
//             }
//             else {
//                 _filteredCountries = countries.filter((country) => {
//                     return country.Type.toLowerCase().includes(event.query.toLowerCase());
//                 });
//             }
//             console.log(_filteredCountries);
//             setFilteredCountries(_filteredCountries);
//         }, 250);
//     }

//     return (
//         <div className="card">
//             <h3>Search by type or year</h3>
//             <AutoComplete value={selectedCountry1}  completeMethod={searchCountry} field="name" onChange={(e) => setSelectedCountry1(e.value)} aria-label="Countries" />
//             {/* suggestions={filteredCountries} */}
//             <GetByType dataFromFile={filteredCountries}/>
//         </div>
//     )
// }
                 