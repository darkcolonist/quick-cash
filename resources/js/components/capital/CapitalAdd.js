import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CapitalAdd() {
    const formik = useFormik({
        initialValues: {
            capitalAmt: '',
            capitalComment: ''

        },
        validationSchema: Yup.object({
            capitalAmt: Yup.number()
                .required('Required'),
            capitalComment: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            axios.post('/add/capital', values).then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.href = "/capital/list";
                }, 1000);
            })
        },
    });

    return (
        <div>
            <h3>Add Capital</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="capitalAmt">Amount: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="capitalAmt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.capitalAmt}
                    />
                    {formik.touched.capitalAmt && formik.errors.capitalAmt ? (
                        <div>{formik.errors.capitalAmt}</div>
                    ) : null}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="capitalComment">Comment: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="capitalComment"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.capitalComment}
                    />
                    {formik.touched.capitalComment && formik.errors.capitalComment ? (
                        <div>{formik.errors.capitalComment}</div>
                    ) : null}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}