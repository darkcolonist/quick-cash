import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import CompanyLoanTableRow from './CompanyLoanTableRow';

export default function LoanTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        await axios.get('/get/loan/companies').then(r => {
            setData(r.data);
            console.log(r.data);
            setLoading(false);
        });
    }, []);
  
    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col" width="100px">Company</th>
                            <th scope="col" width="100px">Loan Amount</th>
                            <th scope="col" width="100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CompanyLoanTableRow
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