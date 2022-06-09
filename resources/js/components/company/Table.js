import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            companies: [],
        }
    }

    componentDidMount() {
        this.getCompanyList();
    }

    getCompanyList = () => {
        let self = this;
        axios.get('/get/company/list').then(function (response) {
            self.setState({
                companies: response.data
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="col-md-4">
                            <a className="btn btn-info" href="/company/add">Add Company</a>
                        </div>
                        <div className="card">
                            
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col" width="100px">Name</th>
                                    <th scope="col" width="100px">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.companies.map(function (x, i) {
                                        return <TableRow key={i} data={x} /> 
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;

