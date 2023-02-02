import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from '../src/redux/config/store';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from '../src/redux/config/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  
);