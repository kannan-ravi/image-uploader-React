import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { UploadProvider } from './context/UploadContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UploadProvider>
      <App />
    </UploadProvider>
  </React.StrictMode>,
)
