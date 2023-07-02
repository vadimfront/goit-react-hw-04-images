import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { ContextModal } from 'hooks/ContextModal';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextModal>
      <App />
    </ContextModal>
    <ToastContainer />
  </React.StrictMode>
);
