import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './shared';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);