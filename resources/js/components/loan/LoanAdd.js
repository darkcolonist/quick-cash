import axios from "axios";
import { useState, useEffect } from "react";

export default function LoanAdd() {
    const [isLoading, setLoading] = useState(true);
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        await axios.get('/get/uses').then(function (response) {
            setIdent(response.data)
            setLoading(false);
        });
    }, []);
  
    if (isLoading) {
        return <div></div>;
    }

    console.log(ident);

    return (
        <div>
            <h3>Add Loan</h3>
            <form>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Employee: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Amount: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Rate: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Term: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Loanee bank: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="userName">Lender bank: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="userName"
                    />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}