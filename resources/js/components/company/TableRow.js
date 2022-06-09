import React, { Component } from 'react';
import TableActionButtons from './TableActionButtons';

class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.data.name }</td>
                <td><TableActionButtons eachRowId={this.props.data.id} />
                </td>
            </tr>
        )
    }
}

export default TableRow;