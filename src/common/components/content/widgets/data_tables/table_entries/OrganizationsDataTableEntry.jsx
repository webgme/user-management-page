/**
 * Custom entries for the organizations data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react';

export default class OrganizationsDataTableEntry extends React.Component {

    render() {

        let buildLink = `${this.props.basePath}organizations/${this.props.name}`;

        return <tr role="row" className="odd">
            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>
        </tr>;
    }
}
