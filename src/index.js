import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  DnDFlow, { Basket } from './pages/home/dndflowindex';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {BrowserRouter} from "react-router-dom"
import { Router } from './components/routes/routes';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
  );
  
  {/* <DndProvider backend={HTML5Backend}>
 <Basket />
  </DndProvider> */}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
