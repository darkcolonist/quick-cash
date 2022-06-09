import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function UserTableRow({data}) {

    return (
        <>
        { data.map(function (x,y) {
            return <tr>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td><a className="btn btn-info" href={"/user/edit/" + x.id}>Edit User</a></td>
            </tr>
        })}
        </>
    );

}