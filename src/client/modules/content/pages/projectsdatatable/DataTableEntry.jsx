import React from 'react';

export default class DataTableEntry extends React.Component {

    render() {
        return <tr role="row" className="odd">
            <td className="sorting_1"><a href="#">{this.props.name}</a></td>
            <td>{this.props.owner}</td>
            <td>-</td>
            <td>{this.props.info.viewedAt}</td>
            <td>{this.props.info.modifiedAt}</td>
        </tr>;
    }
}

DataTableEntry.propTypes = {
    name: React.PropTypes.string,
    owner: React.PropTypes.string,
    organization: React.PropTypes.string,
    info: {
        viewedAt: React.PropTypes.string,
        lastChanged: React.PropTypes.string
    }
};
