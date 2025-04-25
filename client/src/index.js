import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'; 


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
axios.defaults.baseURL = API_BASE_URL; 
axios.defaults.withCredentials = true; 
console.log('API_BASE_URL:', API_BASE_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

reportWebVitals();

