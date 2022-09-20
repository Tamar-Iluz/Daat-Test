import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Getfromfile from './test';
import GetByType from './test';
import GetByTabs from './test';
import Grid from './test';
import ToggleButtonDemo from './test';
import AutoCompleteDemo from './test';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Getfromfile/>
    {/* <GetByType/> */}
    {/* <GetByTabs/> */}
    {/* <Grid/> */}
    {/* <ToggleButtonDemo/> */}
    {/* <AutoCompleteDemo/> */}


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
