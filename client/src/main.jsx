import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css'
import store from './app/Store';

createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </StrictMode>
  </Router>
);
