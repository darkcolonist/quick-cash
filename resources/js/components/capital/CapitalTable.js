import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import CapitalTableRow from './CapitalTableRow';

export default function Capital() {
    const [isLoading, setLoading] = useState(true);
    const [capitalList, setCapitalList] = useState({});
    const [capital, setCapital] = useState(0);
    useEffect(async () => {
        await axios.get('/get/capital/list').then(r => {
            setCapitalList(r.data);
            console.log(r.data);
            axios.get('/get/current/capital').then(r => {
                setCapital(r.data);
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
                    <b>Current Capital: {capital}</b>
                </div>
                <div className="col-md-4">
                    <a className="btn btn-info" href="/capital/add">Add Capital</a>
                </div>
                <div className="card">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width="100px">Amount</th>
                                <th scope="col" width="100px">Note</th>
                                <th scope="col" width="100px">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CapitalTableRow
                                capitalList={capitalList}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}