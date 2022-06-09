import React, { Component } from 'react';
import { useState, useEffect } from "react";

export default function UserEdit() {
    return (
        <div>
            <h3>Edit User</h3>
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

                    >
                        <option value=" ">None</option>
                    
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="companyID">Company ID: </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="companyID" />

                </div>
                <div class="form-group col-md-4">
                    <label for="companyName">Role: </label>
                    <select class="form-select" aria-label="Default select example">
                    
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