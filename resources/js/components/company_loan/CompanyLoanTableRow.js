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
        {
            data.map( function(x,y) {
                console.log(x);
                return (<tr>
                    <td>{x.company.name}</td>
                    <td>{x.amount}</td>
                    <td>
                    <a className="btn btn-info" href={"/loancompany/detail/" + x.id}>Details</a>
                    </td>
                </tr>)
            })
        }
        </>
    );

}