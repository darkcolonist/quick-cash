import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import LoanTableRow from './LoanTableRow';

export default function LoanTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data)
            axios.get('/get/loan/employees/' + response.data.id).then(r => {
                setData(r.data);
                console.log(r.data);
                setLoading(false);
            });
        });
    }, []);
  
    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
            <div className="col-md-4">
                    <a className="btn btn-info" href="/loan/add">Add Loan</a>
                </div>
                <div className="card">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col" width="100px">Employee</th>
                            <th scope="col" width="100px">Company</th>
                            <th scope="col" width="100px">Loan Amount</th>
                            <th scope="col" width="100px">Status</th>
                            <th scope="col" width="100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoanTableRow
                                data={data}
                                setData={setData}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}