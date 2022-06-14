import axios from "axios";
import { forEach } from "lodash";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function PayLoan({pathParam}) {
    const [loanID, setLoanID] = useState(0);
    const formik = useFormik({
        initialValues: {
            bank_account_loanee: '',
            bank_account_lender: '',
            id: pathParam,
        },
        validationSchema: Yup.object({
            bank_account_loanee: Yup.string()
                .required('Required'),
            bank_account_lender: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            axios.post('/pay/loan', values).then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.href = "/loan/detail/" + loanID;
                }, 1000)
            })
        },
    });

    useEffect(async () => {
        await axios.get('/get/historys/loan/' + pathParam).then(function (response) {
            setLoanID(response.data);
        })
    }, []);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="bank_account_loanee">Lender Bank acct: </label>
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
                <div className="form-group col-md-4">
                    <label htmlFor="bank_account_lender">Loanee Bank acct: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="bank_account_lender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bank_account_lender}
                    />
                    {formik.touched.bank_account_lender && formik.errors.bank_account_lender ? (
                        <div>{formik.errors.bank_account_lender}</div>
                    ) : null}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );

}