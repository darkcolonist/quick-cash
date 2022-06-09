import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function UserAdd() {
    const [companyIDToggle, setCompanyIDToggle] = useState(true);
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

    function toggleCompanyIDInput(selected) {
        if (selected.target.value !== ' ') {
            setCompanyIDToggle(false);
        } else {
            setCompanyIDToggle(true);
        }
    }

    return (
        <div>
            <h3>Add Users</h3>
            <form>
                <div class="form-group col-md-4">
                    <label for="companyName">Name: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="companyName"
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Email: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="companyName"
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Password: </label>
                    <input 
                        type="password"
                        class="form-control"
                        id="companyName"
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Retype Password: </label>
                    <input 
                        type="password"
                        class="form-control"
                        id="companyName"
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Company: </label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={toggleCompanyIDInput}
                    >
                        <option value=" ">None</option>
                    {
                        companies.data.map(function (x,y) {
                            return <option value={x.id}>{x.name}</option>
                        })
                    }
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="companyID">Company ID: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="companyID"
                    disabled={companyIDToggle}/>
                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Role: </label>
                    <select class="form-select" aria-label="Default select example">
                    {
                        roles.data.map(function (x,y) {
                            return <option value="{x.id}">{x.name}</option>
                        })
                    }
                    </select>
                </div>
                <button
                    type="button"
                    class="btn btn-primary"
                >Submit</button>
            </form>
        </div>
    )
}