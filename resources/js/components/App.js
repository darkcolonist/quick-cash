import React from 'react';
import Table from './company/Table';
import CompanyAdd from './company/CompanyAdd';
import UserTable from './user/UserTable';

const path = window.location.pathname;
function renderSwitch(param) {
    switch(param) {
        case '/company':
            return <Table />;
        case '/user':
            return <UserTable />;
        case '/company/add':
            return <CompanyAdd />;
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