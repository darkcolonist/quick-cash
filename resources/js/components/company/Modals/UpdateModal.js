import axios from 'axios';
import React, { Component } from 'react';

class UpdateModal extends Component {

    constructor (props) {
        super(props);

        this.state = {
            companyName: null,
        }
    }

    inputCompany = (event) => {
        this.setState({
            companyName: event.target.value
        });
    }

    static getDerivedStateFromProps(props, current_state) {
        let companyUpdate = {
            companyName: null
        }

        if (current_state.companyName && (current_state.companyName !== props.companyData.currentCompanyName)) {
            return null;
        }

        if (current_state.companyName !== props.companyData.currentCompanyName ||
            current_state.companyName === props.companyData.currentCompanyName) {
                companyUpdate.companyName = props.companyData.currentCompanyName;
        }

        return companyUpdate;
    }

    updateCompany = () => {
        axios.post('/update/company/data', {
            companyId: this.props.modalId,
            companyName: this.state.companyName
        }).then((response) => {
            setTimeout(() => {
                location.reload();
            }, 300)
        })
    }

    render() {
        return(
            <div className="modal fade" id={"updateModal"+this.props.modalId } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Company Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='form'>
                                <div className='form-group'>
                                    <input type="text"
                                        id="companyName"
                                        value={ this.state.companyName ?? "" }
                                        onChange={ this.inputCompany }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <input type="submit"
                                className="btn btn-info"
                                value="Update"
                                onClick={ this.updateCompany }
                            />
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateModal;