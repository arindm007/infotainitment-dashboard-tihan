import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const resizeObserverErr = function (e) {
  if (e.message.includes('ResizeObserver loop limit exceeded')) {
    // Ignore the error
    return;
  }
  // Log other errors
  console.error(e);
};

window.addEventListener('error', resizeObserverErr);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
