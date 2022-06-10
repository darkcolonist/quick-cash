import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function UserEdit() {
    return (
        <div>
            <h3>Edit User</h3>
            <form>
                <div className="form-group col-md-4">
                    <label htmlFor="companyName">Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="companyName"
                    />
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