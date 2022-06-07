import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

if (document.getElementById('qc-main')) {
    ReactDOM.render(<App />, document.getElementById('qc-main'));
}