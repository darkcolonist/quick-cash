import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";

export default function LoanDetail({ident, pathParam}) {
    const [loan, setLoan] = useState({});
    const [approver, setApprover] = useState("");
    const [acknowledger, setAcknowledger] = useState("");
    const [loanHistory, setLoanHistory] = useState([]);
    const [historylength, setHistoryLength] = useState([]);
    useEffect(async () => {
        await axios.get('/get/loan/detail/' + pathParam).then(function (response) {
            setLoan(response.data);
            setApprover(response.data.approver.name);
            setAcknowledger(response.data.acknowledger.name);
            setLoanHistory(response.data.history);
            setHistoryLength(response.data.historylength);
        });
    }, []);


    return (
        <div>
            <div>
                <b>Amount:</b> {loan.amount}
            </div>
            <div>
                <b>Approved by:</b> {approver ? approver : 'Loan is not yet approved'}
            </div>
            <div>
                <b>Acknowledged by:</b> {acknowledger ? acknowledger : 'Loan is not yet acknowledged'}
            </div>
            <div>
                <b>Term in months:</b> {loan.term_in_months}
            </div>
            <div>
                <b>Interest rate:</b> {loan.rate}%
            </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            historylength > 0 ? (
                                
                                <tr>
                                    <td>data</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>No data</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </div>
    )
}