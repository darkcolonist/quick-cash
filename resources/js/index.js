import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Nav from './components/Nav';

if (document.getElementById('qc-main')) {
    ReactDOM.render(<App />, document.getElementById('qc-main'));
}

if (document.getElementById('qc-main')) {
    ReactDOM.render(<Nav />, document.getElementById('side-nav'));
}