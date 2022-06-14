import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UserAdd() {
    const formik = useFormik({
        initialValues: {
            userName: '',
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

    const [companies, setCompanies] = useState({});
    const [roles, setRoles] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        await axios.get('/get/role/list').then(function (response) {
            setRoles(response);
        }).then(function (response) {
            axios.get('/get/company/list').then(function (response) {
                setCompanies(response);
                setLoading(false);
            });
        }, []);
    }, []);
    
    if (isLoading) {
        return <div></div>;
    }

    return (
        <div>
            <h3>Add Users</h3>
            <form onSubmit={formik.handleSubmit}>
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
                    <label htmlFor="userMail">Email: </label>
                    <input 
                        type="email"
                        className="form-control"
                        id="userMail"
                        //onChange={e => setUserMail(e.target.value)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userMail}
                    />
                    {formik.touched.userMail && formik.errors.userMail ? (
                        <div>{formik.errors.userMail}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userPass">Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="userPass"
                        //onChange={e => setUserPass(e.target.value)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userPass}
                    />
                    {formik.touched.userPass && formik.errors.userPass ? (
                        <div>{formik.errors.userPass}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userRPass">Retype Password: </label>
                    <input 
                        type="password"
                        className="form-control"
                        id="userRPass"
                        //onChange={e => setUserRPass(e.target.value)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userRPass}
                    />
                    {formik.touched.userRPass && formik.errors.userRPass ? (
                        <div>{formik.errors.userRPass}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userCompany">Company: </label>
                    <select
                        id="userCompany"
                        className="form-select"
                        aria-label="Default select example"
                        //onChange={toggleCompanyIDInput}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userCompany}
                    >
                        <option value="">None</option>
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
                    <label htmlFor="userRole">Role: </label>
                    <select
                        id="userRole"
                        className="form-select"
                        aria-label="Default select example"
                        //onChange={e => setUserRole(e.target.value)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userRole}
                    >
                    {
                        roles.data.map(function (x,y) {
                            let init = true;
                            if (init) {
                                return <option value={x.id} selected>{x.name}</option>
                                init = false;
                                setUserRole(x.id);
                            } else {
                                return <option value={x.id}>{x.name}</option>
                            }
                        })
                    }
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}