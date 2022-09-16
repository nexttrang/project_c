import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import store from './lib/redux/store';
import { Provider } from 'react-redux';
import './assets/fonts/SF-Pro-Display-Black.ttf';
import './assets/fonts/SF-Pro-Display-Semibold.ttf';
import './assets/fonts/SF-Pro-Text-Semibold.ttf';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
