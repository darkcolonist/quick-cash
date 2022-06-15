import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function CompanyAdd() {
    const [cname, setCname] = useState('');

    function addCompany() {
        axios.post('/company/add/data', {
            companyName: cname
        }).then((response) => {
            setTimeout(() => {
                window.location.href = "/company";
            }, 500)
        })
      }

    return (
        <div>
            <h3>Add Company</h3>
            <form action="/company" onSubmit={addCompany}>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">New Company Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="companyName"
                        placeholder="Enter Company name"
                        onChange={e => setCname(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ addCompany }
                >Submit</button>
            </form>
        </div>
    )
}