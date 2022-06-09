import React from 'react';
import Table from './company/Table';
import CompanyAdd from './company/CompanyAdd';
import UserAdd from './user/UserAdd';
import UserTable from './user/UserTable';
import UserEdit from './user/UserEdit';

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
        default:
            return;
    }
}

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                { renderSwitch(path) }
            </div>
        </div>
    );
}

export default App;