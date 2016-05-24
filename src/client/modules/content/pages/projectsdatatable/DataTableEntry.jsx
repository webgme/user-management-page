import React from 'react';

class DataTableEntry extends React.Component {

    render() {
        return <tr role="row" className="odd">
            <td className="sorting_1"><a href="#">{this.props.name}</a></td>
            <td>{this.props.owner}</td>
            <td>{this.props.organization}</td>
            <td>{this.props.lastViewed}</td>
            <td>{this.props.lastChanged}</td>
        </tr>;
    }
}

DataTableEntry.propTypes = {
    name: React.PropTypes.string,
    owner: React.PropTypes.string,
    organization: React.PropTypes.string,
    lastViewed: React.PropTypes.string,
    lastChanged: React.PropTypes.string
};

export default DataTableEntry;
