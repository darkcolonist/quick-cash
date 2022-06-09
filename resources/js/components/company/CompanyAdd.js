import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function CompanyAdd() {
    const [cname, setCname] = useState('');

    const addCompany = e => {
        axios.post('/company/add/data', {
            companyName: cname
        })
    }

    return (
        <div>
            <h3>Add Company</h3>
            <form>
                <div class="form-group col-md-4">
                    <label for="companyName">New Company Name: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="companyName"
                        placeholder="Enter Company name"
                        onChange={e => setCname(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    class="btn btn-primary"
                    onClick={ addCompany }
                >Submit</button>
            </form>
        </div>
    )
}