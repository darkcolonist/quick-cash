import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function UserAdd() {
    // form
    const [userName, setUserName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userRPass, setUserRPass] = useState("");
    const [userCompany, setUserCompany] = useState("");
    const [userCompanyID, setUserCompanyID] = useState("");
    const [userRole, setUserRole] = useState("");

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
            setUserCompany(selected.target.value);
        } else {
            setCompanyIDToggle(true);
        }
    }

    function submitForm() {
        axios.post('/user/add/data', {
            userName: userName,
            userMail: userMail,
            userPass: userPass,
            userCompany: userCompany,
            userCompanyID: userCompanyID,
            userRole: userRole
        }).then((response) => {
            console.log(response);
            /*setTimeout(() => {
                window.location.href = "/company";
            }, 500)*/
        })
    }

    return (
        <div>
            <h3>Add Users</h3>
            <form>
                <div class="form-group col-md-4">
                    <label for="userName">Name: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="userName"
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="userMail">Email: </label>
                    <input 
                        type="email"
                        class="form-control"
                        id="userMail"
                        onChange={e => setUserMail(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="userPass">Password: </label>
                    <input 
                        type="password"
                        class="form-control"
                        id="userPass"
                        onChange={e => setUserPass(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="userRPass">Retype Password: </label>
                    <input 
                        type="password"
                        class="form-control"
                        id="userRPass"
                        onChange={e => setUserRPass(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="userCompany">Company: </label>
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
                    <label for="userCompanyID">Company ID: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="userCompanyID"
                        disabled={companyIDToggle}
                        onChange={e => setUserCompanyID(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-4">
                    <label for="userRole">Role: </label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={e => setUserRole(e.target.value)}
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
                <button
                    type="button"
                    class="btn btn-primary"
                    onClick={submitForm}
                >Submit</button>
            </form>
        </div>
    )
}