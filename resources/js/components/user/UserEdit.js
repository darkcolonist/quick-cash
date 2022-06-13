import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UserEdit({pathParam}) {
    const [userRecord, setUserRecord] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        await axios.get('/get/user/' + pathParam).then(function (response) {
            setUserRecord(response.data);
            console.log(response.data);
            setLoading(false);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            userName: userRecord.name,
            userMail: '',
            userPass: '',
            userRPass: '',
            userCompany: '',
            userRole: '4',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Required'),
            userMail: Yup.string()
                .email('Invalid email')
                .required('Required'),
            userPass: Yup.string()
                .required('Required'),
            userRPass: Yup.string()
                .oneOf([Yup.ref('userPass'), null], 'Passwords do not match'),
            userCompany: Yup.string(),
            userRole: Yup.string()
        }),
        onSubmit: values => {
            axios.post('/user/add/data', values).then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.href = "/user";
                }, 1000)
            })
        },
    });

    return (
        <div>
            <h3>Edit User</h3>
            <form>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                    />
                {formik.touched.userName && formik.errors.userName ? (
                    <div>{formik.errors.userName}</div>
                ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Email: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="companyName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="companyName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Retype Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="companyName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Company: </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"

                    >
                        <option value=" ">None</option>
                    
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyID">Company ID: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="companyID" />

                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Role: </label>
                    <select className="form-select" aria-label="Default select example">
                    
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                >Submit</button>
            </form>
        </div>
    )
}