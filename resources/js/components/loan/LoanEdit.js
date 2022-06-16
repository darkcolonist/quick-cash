import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoanAdd({pathParam}) {
    const [isLoading, setLoading] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [rate, setRate] = useState(0);
    const [term, setTerm] = useState(0);
    const [ident, setIdent] = useState({});
    const [loanRecord, setLoanRecord] = useState({});
    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data)
            axios.get('/get/config').then(function (response){
                setRate(response.data[0].value);
                setTerm(response.data[1].value);
            });
            axios.get('/get/loan/detail/' + pathParam).then(function (response){
                setLoanRecord(response.data);
                setLoading(false);
            });
            axios.get('/get/employees').then(function (response) {
                setEmployeeList(response.data);
                
            });
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            loanID: pathParam,
            loanLoanee: loanRecord.loanee_id,
            loanAmt: loanRecord.amount,
            loanRate: loanRecord.rate,
            loanTerm: loanRecord.term_in_months,
            loanLoaneeBank: loanRecord.bank_account_loanee,
            loanLenderBank: loanRecord.bank_account_lender,
        },
        validationSchema: Yup.object({
            loanAmt: Yup.number()
            .required('Required'),
            loanRate: Yup.number()
            .required('Required'),
            loanTerm: Yup.number()
            .required('Required'),
            loanLoaneeBank: Yup.string()
            .required('Required'),
            loanLenderBank: Yup.string()
            .required('Required')
        }),
        onSubmit: values => {
            console.log(values);
            axios.post('/loan/update', values).then((response) => {
                console.log(response.data);
                setTimeout(() => {
                    window.location.href = "/loan/employees";
                }, 1000)
            });
        },
    });
  
    if (isLoading) {
        return <div></div>;
    }

    ( () => {
        formik.initialValues.loanID = pathParam;
        formik.initialValues.loanLoanee = loanRecord.user.id;
        formik.initialValues.loanAmt = loanRecord.amount;
        formik.initialValues.loanRate = loanRecord.rate;
        formik.initialValues.loanTerm = loanRecord.term_in_months;
        formik.initialValues.loanLoaneeBank = loanRecord.bank_account_loanee;
        formik.initialValues.loanLenderBank = loanRecord.bank_account_lender;
    })()
    

    return (
        <div>
            <h3>Add Loan</h3>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group col-md-4">
                    <label htmlFor="loanLoanee">Employee: </label>
                    <select
                        id="loanLoanee"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanLoanee}
                    >
                    {
                        employeeList.map(function (x,y) {
                            if (ident.role_id === 3) {
                                if (x.loanee.company_id === ident.loanee.company_id){
                                    return <option value={x.user.id}>{x.user.name}</option>    
                                }
                            } else {
                                return <option value={x.user.id}>{x.user.name}</option>
                            }
                            
                        })
                    }
                    </select>
                    {formik.touched.loanLoanee && formik.errors.loanLoanee ? (
                        <div>{formik.errors.loanLoanee}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="loanAmt">Amount: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="loanAmt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanAmt}
                    />
                    {formik.touched.loanAmt && formik.errors.loanAmt ? (
                        <div>{formik.errors.loanAmt}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="loanRate">Rate: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="loanRate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanRate}
                    />
                    {formik.touched.loanRate && formik.errors.loanRate ? (
                        <div>{formik.errors.loanRate}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="loanTerm">Term: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="loanTerm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanTerm}
                    />
                    {formik.touched.loanTerm && formik.errors.loanTerm ? (
                        <div>{formik.errors.loanTerm}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="loanLoaneeBank">Loanee bank: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="loanLoaneeBank"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanLoaneeBank}
                    />
                    {formik.touched.loanLoaneeBank && formik.errors.loanLoaneeBank ? (
                        <div>{formik.errors.loanLoaneeBank}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="loanLenderBank">Lender bank: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="loanLenderBank"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.loanLenderBank}
                    />
                    {formik.touched.loanLenderBank && formik.errors.loanLenderBank ? (
                        <div>{formik.errors.loanLenderBank}</div>
                    ) : null}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}