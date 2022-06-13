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
            })
        },
    });

    const [amortizationMonths, setAmortizationMonths] = useState(0);
    const [loanInterest, setLoanInterest] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [ident, setIdent] = useState({});
    const [existingLoan, setExistingLoan] = useState({});
    useEffect(async () => {
        //
        await axios.get('/get/uses').then(function (response) {
            if (response.data){
                setIdent(response.data)
                //user id
            }
        });
        await axios.get('/users/loan/' + ident.id).then(function (r){
            setExistingLoan(r.data);
            setLoading(false);
            console.log('f');
        })
        await axios.get('/get/config').then(function (response) {
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
            { existingLoan.id
            }
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
            </div>
        </div>
    </div>
    );
}