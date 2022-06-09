import React from 'react';
import Table from './company/Table';
import UserTable from './user/UserTable';

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/* components goes here */}
                <Table />
                <UserTable />
            </div>
        </div>
    );
}

export default App;