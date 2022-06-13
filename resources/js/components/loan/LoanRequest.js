import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function LoanRequest() {
    const formik = useFormik({
        initialValues: {
            loanAmt: '',
            amortDuration: '1',
        },
        validationSchema: Yup.object({
            loanAmt: Yup.number()
                .required('Required'),
            amortDuration: Yup.string()
            .required('Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [amortizationMonths, setAmortizationMonths] = useState(0);
    const [isLoading, setLoading] = useState(true);
    useEffect(async () => {
        axios.get('/get/config').then(function (response) {
            response.data.map(function(x,y) {
                if (x.id === 2) {
                    setAmortizationMonths(x.value);
                }
            })
            setLoading(false);
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
            <form onSubmit={formik.handleSubmit}>
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
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            </div>
        </div>
    </div>
    );
}