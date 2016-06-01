import React from 'react';
import {Link} from 'react-router';

export default class DataTableEntry extends React.Component {

    render() {
        
        if (this.props.whichTable === 'projects') {
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
        } else {
            let rights = this.props.read ? 'Read  ' : '';
                rights += this.props.write? 'Write  ' : '';
                rights += this.props.delete? 'Delete' : '';

            return (
                <tr role="row" className="odd">
                    <td>
                        {this.props.orgNum > 0 ? <i className="fa fa-user-plus"/> : <i className="fa fa-user"/> }
                        {'  ' + this.props.name}
                    </td>
                    <td>{rights}</td>
                </tr>
            );
        }

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
