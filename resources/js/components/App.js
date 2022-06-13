import React from 'react';
//import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Route, Redirect } from 'react-router'
import { useState, useEffect } from "react";

import Table from './company/Table';
import CompanyAdd from './company/CompanyAdd';
import UserAdd from './user/UserAdd';
import UserTable from './user/UserTable';
import UserEdit from './user/UserEdit';
import ConfigEdit from './config/ConfigEdit';
import LoanRequest from './loan/LoanRequest';

let path = window.location.pathname;
let pathwithparams = path.split('/');
if (pathwithparams.length > 3) {
    path = pathwithparams.pop();
    path = pathwithparams.join('/');
}

function App() {
    const [ident, setIdent] = useState({});
    axios.get('/get/uses').then(function (response) {
        if (response.data){
            setIdent(response.data)
            //user id
        }
    });

    function renderSwitch(param) {
        switch(param) {
            case '/company':
                return <Table ident={ident}/>;
            case '/user':
                return <UserTable ident={ident}/>;
            case '/company/add':
                return <CompanyAdd ident={ident}/>;
            case '/user/add':
                return <UserAdd ident={ident}/>;
            case '/user/edit':
                return <UserEdit ident={ident}/>;
            case '/config/edit':
                return <ConfigEdit ident={ident}/>
            case '/loan/request':
                return <LoanRequest ident={ident}/>
            default:
                return;
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                { renderSwitch(path) }
            </div>
        </div>
    );
}

export default App;