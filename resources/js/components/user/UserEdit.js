import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UserEdit({pathParam}) {
    const [userRecord, setUserRecord] = useState({});
    const [loaneeRecord, setLoaneeRecord] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [companies, setCompanies] = useState({});
    const [roles, setRoles] = useState({});

    useEffect(async () => {
        await axios.get('/get/user/' + pathParam).then(function (response) {
            setUserRecord(response.data);
            console.log(response.data);
        });
        await axios.get('/get/role/list').then(function (response) {
            setRoles(response);
        }).then(function (response) {
            axios.get('/get/company/list').then(function (response) {
                setCompanies(response);
                setLoading(false);
            });
        }, []);
    }, []);

    const formik = useFormik({
        initialValues: {
            userName: userRecord.name,
            userMail: userRecord.email,
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
            console.log(values);
            /*axios.post('/user/add/data', values).then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.href = "/user";
                }, 1000)
            })*/
        },
    });
    
    if (isLoading) {
        return <div></div>;
    }

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
                    <label htmlFor="companyName">Company: </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"

                    >
                    <option value=" ">None</option>
                    {
                        companies.data.map(function (x,y) {
                            if (userRecord.loanee !== null){
                            if (userRecord.loanee.company_id === x.id){
                                return <option value={x.id} selected>{x.name}</option>
                            } else {
                                return <option value={x.id}>{x.name}</option>
                            }
                            }
                        })
                    }
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Role:</label>
                    <select className="form-select" aria-label="Default select example">
                    {
                        roles.data.map(function (x,y) {
                            if (userRecord.role_id === x.id) {
                                return <option value={x.id} selected>{x.name}</option>
                            } else {
                                return <option value={x.id}>{x.name}</option>
                            }
                        })
                    }
                    </select>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}