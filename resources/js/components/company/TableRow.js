import React, { Component } from 'react';

class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.data.name }</td>
                <td>
                </td>
            </tr>
        )
    }
}

export default TableRow;