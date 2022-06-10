import React from 'react';

function Nav() {
    const navlist = [
        { 'Users': '/user', 'access': [4,3,2] },
        { 'Companies': '/company', 'access': [4,3] },
        { 'Company Loans': '/home', 'access': [4,3] },
        { 'Employee Loans': '/home', 'access': [4,3,2] },
        { 'Capital': '/home', 'access': [4,3] },
        { 'Create Loan': '/home', 'access': [1] },
    ];

    return (
        <div className="container">
            <div className="row justify-content-center">
                navigation
            </div>
        </div>
    );
}

export default Nav;