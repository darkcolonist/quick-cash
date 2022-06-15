import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function CapitalTableRow({capital}) {

    return (
        <>
        { capital.map(function (x,y) {
            return <tr>
                <td>{x.amount}</td>
                <td>{x.comment}</td>
                <td></td>
            </tr>
        })}
        </>
    );

}