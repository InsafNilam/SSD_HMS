import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.hydrate(
  <React.StrictMode>
    <HelmetProvider >
      <App>
        <Helmet>
            <link rel="stylesheet" href="./App.css" />
        </Helmet>
      </App>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

