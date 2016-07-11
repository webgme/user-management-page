/**
 * Custom entries for the organizations data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class OrganizationsDataTableEntry extends Component {

    render() {

        const {basePath} = this.props;

        const buildLink = `${basePath}organizations/${this.props.name}`;

        return (
            <tr role="row" className="odd">
                <td className="sorting_1">
                    <Link to={buildLink}>{this.props.name}</Link>
                </td>
            </tr>
        );
    }
}

OrganizationsDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired
};
