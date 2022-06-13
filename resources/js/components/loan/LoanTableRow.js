import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function LoanTableRow({data}) {
    function getLoaneeRecord(id) {

    }
    //console.log(data);
    return (
        <>
        { data.map(function (x,y) {
            
            
            let $loaneeRecord = getLoaneeRecord(x.loanee_id)
            return <tr>
                <td>{x.user.name}</td>
                <td>{x.company.name}</td>
                <td>{x.amount}</td>
                <td>

                </td>
                <td>
                    <a className="btn btn-info" href={"/user/edit/" + x.id}>Approve</a>
                    <a className="btn btn-info" href={"/user/edit/" + x.id}>Acknowledge</a>
                </td>
            </tr>
        })}
        </>
    );

}