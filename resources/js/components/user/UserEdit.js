import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function UserEdit({pathParam}) {
    const [userRecord, setUserRecord] = useState({});
    const [loaneeRecord, setLoaneeRecord] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [companies, setCompanies] = useState({});
    const [roles, setRoles] = useState({});
    const [userCompany, setUserCompany] = useState(0);

    useEffect(async () => {
        await axios.get('/get/user/' + pathParam).then(function (response) {
            setUserRecord(response.data);
            if (response.data.loanee === null){
                setUserCompany(0);
            } else {
                setUserCompany(response.data.loanee.company_id);
            }
        });
        await axios.get('/get/role/list').then(function (response) {
            setRoles(response);
        }).then(function (response) {
            axios.get('/get/company/list').then(function (response) {
                setCompanies(response);
                setLoading(false);
            });
        });
    }, []);

    const formik = useFormik({
        initialValues: { },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Required'),

            userCompany: Yup.string(),
            userRole: Yup.string()
        }),
        onSubmit: values => {
            console.log(values);
            axios.post('/edit/user', values).then((response) => {
                console.log(response);
                /*setTimeout(() => {
                    window.location.href = "/user";
                }, 1000)*/
            });
        },
    });
    
    if (isLoading) {
        return <div></div>;
    }

    ( () => {
        formik.initialValues.id = userRecord.id;
        formik.initialValues.userName = userRecord.name;
        formik.initialValues.userMail = userRecord.email;
        formik.initialValues.userRole = userRecord.role_id;
        formik.initialValues.userPass = '';
        formik.initialValues.userRPass = '';
        if (userRecord.loanee !== null) {
            formik.initialValues.userCompanyID = userRecord.loanee.company_identification;
            formik.initialValues.userCompany = userRecord.loanee.company_id;
        } else {
            formik.initialValues.userCompanyID = '';
            formik.initialValues.userCompany = '';
        }
        
    })()

    return (
        <div>
            <h3>Edit User</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={userRecord.name}
                    />
                {formik.touched.userName && formik.errors.userName ? (
                    <div>{formik.errors.userName}</div>
                ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userMail">Email: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userMail"
                        defaultValue={userRecord.email}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userPass">New Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="userPass"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userRPass">Retype Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="userRPass"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userCompany">Company: </label>
                    <select
                        className="form-select"
                        id="userCompany"
                        aria-label="Default select example"
                        defaultValue={userCompany}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                    <option value=" ">None</option>
                    {
                        companies.data.map(function (x,y) {
                            return <option value={x.id}>{x.name}</option>
                        })
                    }
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userCompanyID">Company ID: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userCompanyID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={formik.values.userCompanyID}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userRole">Role:</label>
                    <select
                        id="userRole"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={userRecord.role_id}
                    >
                    {
                        roles.data.map(function (x,y) {
                            return <option value={x.id}>{x.name}</option>
                        })
                    }
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}