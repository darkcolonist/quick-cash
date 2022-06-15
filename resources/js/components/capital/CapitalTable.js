import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import CapitalTableRow from './CapitalTableRow';

export default function Capital() {
    const [isLoading, setLoading] = useState(true);
    const [capital, setCapital] = useState({});
    useEffect(async () => {
        await axios.get('/get/capital/list').then(r => {
            setCapital(r.data);
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
                <div className="col-md-4">
                    <a className="btn btn-info" href="/capital/add">Add Capital</a>
                </div>
                <div className="card">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col" width="100px">Amount</th>
                            <th scope="col" width="100px">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CapitalTableRow
                                capital={capital}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}