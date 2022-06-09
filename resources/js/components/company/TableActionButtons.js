import axios from 'axios';
import React, { Component } from 'react';
import UpdateModal from './Modals/UpdateModal';

class TableActionButtons extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentCompanyName: null,
        }
    }

    getCompany = (id) => {
        axios.post('/get/company/record', {
            companyId: id
        }).then((response) => {
            this.setState({
                currentCompanyName: response.data.name
            })
        })
    }

    render() {
        return (
            <div className="btn-group" role="group">
                <button type="button"
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target={ "#updateModal"+this.props.eachRowId }
                    onClick={ () => { this.getCompany(this.props.eachRowId) }}>Update</button>
                <UpdateModal modalId={ this.props.eachRowId } companyData={ this.state }/>
            </div>
        )
    }
}

export default TableActionButtons;