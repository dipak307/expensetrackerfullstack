import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobleStyle } from './styles/GlobleStyle';
import { GlobalProvider } from './context/globalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GlobleStyle/>
  <GlobalProvider>
    <App />
  </GlobalProvider>
  </React.StrictMode>
);

