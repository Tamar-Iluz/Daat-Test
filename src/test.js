import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from 'primereact/inputtext';
import "./css/ButtonDemo.css"
import { Button } from 'primereact/button';
import moment from 'moment/moment';

//1,8
export default function Getfromfile() {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)

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
      {/* onClick={setRefresh(true) }*/}
       {/* <Button label="Refresh" className="p-button-rounded" /> */}
      {/* {refresh ? */}
        <div>{JSON.stringify(data)}</div> :
        <div></div>
      {/* } */}
      <br />
      {data.length > 0 ?
        <div>
          <ToggleButtonDemo dataFromFile={data} />
          <Search dataFromFile={data} />
          <FormatedYear dataFromFile={data}/>
        </div> :
        <div></div>}
    </div>
  )
}
//2
//במייל
//3
export function GetByType(props) {
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);
  const counts = {};

  function compare(a, b) {
    if (props.howSendMe == "Getfromfile" || props.howSendMe == "ShowAsc") {
      if (a.Type < b.Type) {
        return -1;
      }
      if (a.Type > b.Type) {
        return 1;
      }
      return 0;
    }
    else if (props.howSendMe == "ShowDesc") {
      if (a.Type < b.Type) {
        return 1;
      }
      if (a.Type > b.Type) {
        return -1;
      }
      return 0;
    }
  }
  return (
    <div>
      {dataFromFile.sort(compare).map(dataFromFile => {
        counts[dataFromFile.Type] = (counts[dataFromFile.Type] || 0) + 1;
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
      })}
      {
        Object.entries(counts).forEach(entry => {
          const [key, value] = entry;
          console.log(key, value);
        })
      }
      {dataFromFile.length > 0 && props.howSendMe == "Getfromfile" ?
        <div>
          <GetByTabs CountAndType={counts} DataFromFile={dataFromFile} />
        </div> :
        <div></div>}
    </div>
  );
}
// 4
export function GetByTabs(props) {
  const [countAndType, setCountAndType] = useState(props.CountAndType);
  const [dataFromFile, setDataFromFile] = useState(props.DataFromFile);
  const countArray = [];
  return (
    <div>
      {Object.entries(countAndType).forEach(entry => {
        countArray.push(entry);
      })}

      <TabView>
        {countArray.map(e => {
          return (
            <TabPanel header={e}>
              {dataFromFile.map(d => {
                if (d.Type == e[0])
                  return (
                    <div>
                      <h5>Title: {d.Title}</h5>
                      <h5>Year: {d.Year}</h5>
                      <h5>imdbID: {d.imdbID}</h5>
                      <h5>Type: {d.Type}</h5>
                      <h5>Poster: {d.Poster}</h5>
                      ------------------
                    </div>
                  )
              })}
            </TabPanel>
          )
        })}
      </TabView>
    </div>
  )
}
//5
export function ToggleButtonDemo(props) {
  const [checked2, setChecked2] = useState(false);
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);

  return (
    <div>
      <div className="card">
        <ToggleButton checked={checked2} onChange={(e) => setChecked2(e.value)} onLabel="Grid" offLabel="List" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />                </div>
      {checked2 ?
        <div>
          <Grid dataFromFile={dataFromFile} />

        </div> :
        <div>
          <GetByType dataFromFile={dataFromFile} howSendMe={"Getfromfile"} />
        </div>}
      <ShowDescOrAsc dataFromFile={dataFromFile} />
    </div>
  );
}
export function Grid(props) {
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);

  return (
    <div>
      <div className="card">
        <DataTable value={dataFromFile} showGridlines responsiveLayout="scroll">
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
//6,7
export function Search(props) {
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);
  const [value, setValue] = useState('');
  const [inputText, setInputText] = useState('');
  const [clear, setClear] = useState('');

  let inputHandler = (e) => {
    setValue(e.target.value);
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  return (
    <div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={value} onChange={inputHandler} placeholder="Search" />
      </span>
      <Button label="Clear Search" className="p-button-text"  
      onClick={()=>{return(setValue(''),setInputText(''))}}/>
      <div> <List dataFromFile={dataFromFile} input={inputText} /></div>
    </div>
  )
}
export function List(props) {
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);
  const filteredData = dataFromFile.filter((el) => {
    if (props.input === '') {
      return el;
    }
    else if (props.input >= 0) {
      return el.Year.toLowerCase().includes(props.input)
    }
    else {
      return el.Type.toLowerCase().includes(props.input)
    }

  })

  return (
    <ul>
      {filteredData.map((item) => (
        <li >
          <h5> Title : {item.Title}</h5>
          <h5> Year : {item.Year}</h5>
          <h5> imdbID : {item.imdbID}</h5>
          <h5> Type : {item.Type}</h5>
          <h5> Poster : {item.Poster}</h5>
        </li>
      ))}
    </ul>
  )
}
//9
export function ShowDescOrAsc(props) {
  const [checked2, setChecked2] = useState(false);
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);
  return (
    <div>
      <div className="card">
        <ToggleButton checked={checked2} onChange={(e) => setChecked2(e.value)} onLabel="Desc" offLabel="Asc" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />                </div>
      {checked2 ?
        <div>
          <GetByType dataFromFile={dataFromFile} howSendMe={"ShowDesc"} />
        </div> :
        <div>
          <GetByType dataFromFile={dataFromFile} howSendMe={"ShowAsc"} />
        </div>}
    </div>
  )
}
export function FormatedYear(props){
  const [dataFromFile, setDataFromFile] = useState(props.dataFromFile);
  return (
  <div>
    <h3>Year:</h3>
    {dataFromFile.map(data=>
   <h5>{moment(data.Year).format('L')}</h5>)}
  </div>
  )
}