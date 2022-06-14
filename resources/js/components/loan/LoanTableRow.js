import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function LoanTableRow({data}) {
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
                    <a className="btn btn-info" href={"/user/edit/" + x.id}>Approve</a>
                    <a className="btn btn-info" href={"/user/edit/" + x.id}>Acknowledge</a>
                    <a className="btn btn-info" href={"/user/edit/" + x.id}>Details</a>
                </td>
            </tr>
        })}
        </>
    );

}