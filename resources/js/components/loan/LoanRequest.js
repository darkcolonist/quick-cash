import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function LoanRequest() {
    const formik = useFormik({
        initialValues: {
            amount: '',
            amortDuration: '1',
            loanee_id: '',
            company_id: '',
            rate: loanInterest,
            bank_account_loanee: '',
        },
        validationSchema: Yup.object({
            amount: Yup.number()
                .required('Required'),
            amortDuration: Yup.string()
                .required('Required'),
            bank_account_loanee: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            values.rate = loanInterest;
            values.loanee_id = ident.loanee.id;
            values.company_id = ident.loanee.company_id;
            axios.post('/loan/add/data', values).then((response) => {
                window.location.replace("/loan/request");
            })
        },
    });

    const [amortizationMonths, setAmortizationMonths] = useState(0);
    const [loanInterest, setLoanInterest] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [ident, setIdent] = useState({});
    const [existingLoan, setExistingLoan] = useState({});
    const [history, setHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);

    useEffect(async () => {
        //
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data);
            //user id
            axios.get('/users/loan/' + response.data.id).then(function (r){
                setExistingLoan(r.data);
                setHistory(r.data.history);
                setHistoryCount(r.data.historycount);
                setLoading(false);
            })
        });
        axios.get('/get/config').then( function (response) {
            response.data.map(function(x,y) {
                if (x.id === 1) {
                    setLoanInterest(x.value);
                }
                if (x.id === 2) {
                    setAmortizationMonths(x.value);
                }
            })
        });
        
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
            <h3>Request Loan</h3>
            { existingLoan.id ? (
                <div>
                    <div>You have an existing loan.</div>
                    <div>Amount: {existingLoan.amount}</div>
                    <div>Rate (percent): {existingLoan.rate}</div>
                    <div>Term (months): {existingLoan.term_in_months}</div>
                    <div>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Amount to pay</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                        <tbody>
                            {
                                historyCount > 0 ? (
                                    history.map( function(x,y){
                                        return <tr>
                                            <td>{existingLoan.debtpermonth}</td>
                                            <td>{existingLoan.amort_dates[y]}</td>
                                            <td>
                                            {
                                                x.is_paid === 1 ? (
                                                    <p>Paid</p>
                                                ) : (
                                                    <p>Not paid</p>
                                                )
                                            }
                                            </td>
                                        </tr>
                                    })
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
                </div>
                
            ) : (
                <form onSubmit={formik.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="amount">Amount: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="amount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                    />
                    {formik.touched.amount && formik.errors.amount ? (
                        <div>{formik.errors.amount}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="interest">Interest: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="interest"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={loanInterest}
                        disabled
                    />
                    {formik.touched.loanAmt && formik.errors.loanAmt ? (
                        <div>{formik.errors.loanAmt}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="amortDuration">Amortization in Months: </label>
                    <select
                        className="form-control"
                        id="amortDuration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amortDuration}
                    >
                        {
                        (function () {
                            let idx = 1;
                            let rows = [];
                            while (idx <= amortizationMonths) {
                                rows.push(<option value={idx}>{idx}</option>);
                                idx++;
                            }
                            return rows;
                        })()
                        }
                    </select>
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="bank_account_loanee">Bank Account: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="bank_account_loanee"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bank_account_loanee}
                    />
                    {formik.touched.bank_account_loanee && formik.errors.bank_account_loanee ? (
                        <div>{formik.errors.bank_account_loanee}</div>
                    ) : null}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            )}
            
            </div>
        </div>
    </div>
    );
}