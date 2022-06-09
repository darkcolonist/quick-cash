import axios from "axios";
import { useState, useEffect } from "react";
import UserTableRow from './UserTableRow';

export default function UserTable() {
    const [tem, setTem] = useState('tem');
    
    const [data, setData] = useState({});
    useEffect(async () => {
        const result = await axios.get('/get/user/list');
        setData(result.data);
    })
  
    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col" width="100px">Users</th>
                            <th scope="col" width="100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
        	                <UserTableRow
                                data={data}
                                setData={setData}
                                tem={tem}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}