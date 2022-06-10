import React from 'react';
//import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Route, Redirect } from 'react-router'

import Table from './company/Table';
import CompanyAdd from './company/CompanyAdd';
import UserAdd from './user/UserAdd';
import UserTable from './user/UserTable';
import UserEdit from './user/UserEdit';
import ConfigEdit from './config/ConfigEdit';

let path = window.location.pathname;
let pathwithparams = path.split('/');
if (pathwithparams.length > 3) {
    path = pathwithparams.pop();
    path = pathwithparams.join('/');
}
function renderSwitch(param) {
    switch(param) {
        case '/company':
            return <Table />;
        case '/user':
            return <UserTable />;
        case '/company/add':
            return <CompanyAdd />;
        case '/user/add':
            return <UserAdd />;
        case '/user/edit':
            return <UserEdit />;
        case '/config/edit':
            return <ConfigEdit />
        default:
            return;
    }
}

function App() {

    axios.get('/get/uses').then(function (response) {
        if (!response.data){
           
        }
    });
    return (
        <div className="container">
            <div className="row justify-content-center">
                { renderSwitch(path) }
            </div>
        </div>
    );
}

export default App;