import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function LoanTableRow({data}) {
    const [isLoading, setLoading] = useState(true);
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data)
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div></div>;
    }
    return (
        <>
        { data.map(function (x,y) {
            
            return <tr>
                <td>{x.user.name}</td>
                <td>{x.company.name}</td>
                <td>{x.amount}</td>
                <td>
                {
                    x.approver_id ? (
                        <p>Approved</p>
                    ) : (
                        <p>Pending Approval</p>
                    )
                }
                {
                    x.acknowledger_id ? (
                        <p>Acknowledged</p>
                    ) : (
                        <p>Pending Acknowledgement</p>
                    )
                }
                </td>
                <td>
                    {
                        ident.role_id < 3 ? (
                                <a className="btn btn-info" href={"/acknowledge/loan/" + x.id}>Acknowledge</a>
                        ) : (
                            <a className="btn btn-info" href={"/approve/loan/" + x.id}>Approve</a>
                        )
                    }
                    <a className="btn btn-info" href={"/loan/detail/" + x.id}>Details</a>
                </td>
            </tr>
        })}
        </>
    );

}