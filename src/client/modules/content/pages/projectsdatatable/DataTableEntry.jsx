import React from 'react';

var DataTableEntry = React.createClass({

    render() {
        return <tr role="row" className="odd">
            <td className="sorting_1">{this.props.name}</td>
            <td>{this.props.owner}</td>
            <td>{this.props.organization}</td>
            <td>{this.props.lastViewed}</td>
            <td>{this.props.lastChanged}</td>
        </tr>;
    }
});

module.exports = DataTableEntry;
