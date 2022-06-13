import React from 'react';
import { useState, useEffect } from "react";

function Nav() {
    const [ident, setIdent] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            if (response.data){
                setIdent(response.data)
                setLoading(false);
                //user id
            }
        });
    }, []);

    const navlist = [
        { 'label': 'Users', 'path': '/user', 'access': [1,2,3] },
        { 'label': 'Companies', 'path': '/company', 'access': [1,2] },
        { 'label': 'Company Loans', 'path':  '/home', 'access': [1,2] },
        { 'label': 'Employee Loans', 'path': '/loan/employees', 'access': [1,2,3] },
        { 'label': 'Capital', 'path': '/home', 'access': [1,2] },
        { 'label': 'Request Loan', 'path': '/loan/request', 'access': [1,4] },
        { 'label': 'Edit Configuration', 'path': '/config/edit', 'access': [1] }
    ];

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                {navlist.map(function(x,y) {
                    {if (x.access.includes(ident.role_id)){
                        return <div><a href={x.path}>{x.label}</a></div>
                    }
                }
                })}
            </div>
        </div>
    );
}

export default Nav;