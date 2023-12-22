import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
// import {DataContext} from "./components/context.js"
// import {DataProvider} from "./components/context.js"
import App from './components/App';

//redux store
import store from './redux/store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   
    <App/>
    
  </Provider>
   
);

