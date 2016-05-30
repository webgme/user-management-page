import React from 'react';
import {Link} from 'react-router';

export default class DataTableEntry extends React.Component {

    render() {

        let buildLink = '/projects/' + this.props.owner + '/' + this.props.name;

        return <tr role="row" className="odd">
            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>
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
    info: React.PropTypes.shape({
        viewedAt: React.PropTypes.string,
        lastChanged: React.PropTypes.string
    })
};
