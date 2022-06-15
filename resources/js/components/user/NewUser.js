import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  { Redirect } from 'react-router-dom'

export default function NewUser() {
    const [ident, setIdent] = useState({});
    const [companies, setCompanies] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        await axios.get('/get/company/list').then(function (response) {
            setCompanies(response);
            axios.get('/get/uses').then(function (response) {
                if (response.data){
                    setIdent(response.data)
                    setLoading(false);
                    //user id
                }
            });
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            userCompany: '',
            userCompanyID: '',
        },
        validationSchema: Yup.object({
            userCompany: Yup.string()
                .required('Required'),
            userCompanyID: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            console.log(values);
            axios.post('/add/loanee', values).then((response) => {
                window.location.replace("/home");
            })
        },
    });
    
    if (isLoading) {
        return <div></div>;
    }

    return (
        <div>
            <h3>Complete Registration</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="userCompany">Company: </label>
                    <select
                        id="userCompany"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userCompany}
                    >
                        <option value=""></option>
                    {
                        companies.data.map(function (x,y) {
                            return <option value={x.id}>{x.name}</option>
                        })
                    }
                    </select>
                    {formik.touched.userCompany && formik.errors.userCompany ? (
                        <div>{formik.errors.userCompany}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userCompanyID">Company ID: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userCompanyID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userCompanyID}
                    />
                    {formik.touched.userCompanyID && formik.errors.userCompanyID ? (
                        <div>{formik.errors.userCompanyID}</div>
                    ) : null}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}